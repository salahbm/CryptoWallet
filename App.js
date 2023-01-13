import 'react-native-gesture-handler';
import {ethers} from 'ethers';
import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import RootStackScreen from './screens/RootStackScreen';
import {View, Text, ActivityIndicator} from 'react-native';
import {COLORS} from './constants';
import {Authcontext} from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {balanceInformation} from './components/balanceInformation';
import {SwitchButton} from './components/balanceInformation';
export const DataContext = React.createContext();
const App = () => {
  const [tokenBalance, setTokenBalance] = useState('');
  const [wallet, setWallet] = useState(undefined);
  const [tokenUSD, setTokenUSD] = useState('');
  const [provider, setProvider] = useState(
    new ethers.providers.StaticJsonRpcProvider('mainnet'),
  );
  const [network, setNetwork] = useState('mainnet');
  // write a function getwallet data and state using use effect
  useEffect(() => {
    async function getWalletData() {
      const walletData = await EncryptedStorage.getItem('userWallet');

      if (walletData) {
        setWallet(JSON.parse(walletData));
      }
    }

    getWalletData();
  }, []);

  useEffect(() => {
    async function getBalance() {
      const currenttokens = await balanceInformation(wallet.address);
      setTokenBalance(currenttokens);
    }

    if (wallet !== undefined) {
      getBalance();
    }
  });

  useEffect(() => {
    async function getBalanceInUSD(address) {
      try {
        const exchangeRate = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        )
          .then(response => response.json())
          .then(data => data.ethereum.usd);
        const balanceInUSD = (tokenBalance * exchangeRate).toFixed(9);
        setTokenUSD(balanceInUSD);
      } catch (error) {
        console.log(error);
      }
    }
    getBalanceInUSD();
  });

  // switch networks

  // function SwitchButtonLogic() {
  //   if (network === 'mainnet') {
  //     setProvider(
  //       new ethers.providers.StaticJsonRpcProvider(
  //         'https://eth-goerli.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
  //       ),
  //     );
  //     setNetwork('testnet');
  //   } else {
  //     setProvider(
  //       new ethers.providers.StaticJsonRpcProvider(
  //         'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
  //       ),
  //     );
  //     setNetwork('mainnet');
  //   }
  // }

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RERIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  //use memo to memorize log/pass

  const authContext = useMemo(
    () => ({
      signIn: async (userName, password) => {
        // setUserToken('usert');
        // setIsLoading(false);
        let userToken = null;
        userToken = null;
        const savedData = await EncryptedStorage.getItem('userWallet');
        const emailFromStorage = JSON.parse(savedData).email;
        const passFromStorage = JSON.parse(savedData).password;

        if (userName == emailFromStorage && password == passFromStorage) {
          userToken = '1123';

          try {
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        // setUserToken(null);
        // setIsLoading(false);
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RERIEVE_TOKEN', token: userToken});
      // setIsLoading(false);
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.violent} />
      </View>
    );
  }
  return (
    <Authcontext.Provider value={authContext}>
      <DataContext.Provider
        value={{tokenBalance, wallet, tokenUSD, provider, network}}>
        <NavigationContainer>
          {loginState.userToken != null ? <Tabs /> : <RootStackScreen />}
        </NavigationContainer>
      </DataContext.Provider>
    </Authcontext.Provider>
  );
};

export default App;
