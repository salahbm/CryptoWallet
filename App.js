import 'react-native-gesture-handler';
import {ethers, providers} from 'ethers';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import RootStackScreen from './screens/RootStackScreen';
import {View, Text, ActivityIndicator} from 'react-native';
import {COLORS} from './constants';
import {Authcontext} from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export const DataContext = React.createContext();

const App = () => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [wallet, setWallet] = useState(undefined);
  const [tokenUSD, setTokenUSD] = useState(0);

  //swap networks

  const [network, setNetwork] = useState('Mainnet');
  const [provider, setProvider] = useState(
    new ethers.providers.StaticJsonRpcProvider(
      'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
    ),
  );
  const [netColor, setNetColor] = useState(COLORS.green);

  // function to toggle the network
  const toggleNetwork = () => {
    if (network === 'Mainnet') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-goerli.g.alchemy.com/v2/9fNSQ8sQ7nVqaeqeZeK5ELbs7mW-R3gA',
        ),
      );
      setNetwork('Goerli');
      setNetColor('orange');
    } else if (network === 'Goerli') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://polygon-mumbai.g.alchemy.com/v2/lDL61yz-2Ys5pmxneawlm9GKUwGwRgyW',
        ),
      );
      setNetwork('Polygon');
      setNetColor(COLORS.powderBlue);
    } else if (network === 'Polygon') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://opt-goerli.g.alchemy.com/v2/wWoEinTD6ok4yN7n5ff5wPi4eUIYF4ET',
        ),
      );
      setNetwork('Optimism');
      setNetColor(COLORS.red);
    } else {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
        ),
      );
      setNetwork('Mainnet');
      setNetColor(COLORS.green);
    }
  };

  useEffect(() => {
    async function getBalance(address) {
      const balance = (await provider.getBalance(wallet.address)).toString();
      const formatted = ethers.utils.formatUnits(balance, 'ether');

      setTokenBalance(formatted);
    }

    if (wallet !== undefined) {
      getBalance();
    }
  }, [provider, wallet]);

  useEffect(() => {
    async function getBalanceInUSD(address) {
      try {
        const exchangeRate = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        )
          .then(response => response.json())
          .then(data => data.ethereum.usd);
        const balanceInUSD = (tokenBalance * exchangeRate).toFixed(4);
        setTokenUSD(balanceInUSD);
      } catch (error) {
        console.log(error);
      }
    }
    getBalanceInUSD();
  }, [tokenUSD]);

  // write a function getwallet data and state using use effect
  useEffect(() => {
    async function getWalletData() {
      const walletData = await EncryptedStorage.getItem('userWalletData');

      if (walletData) {
        setWallet(JSON.parse(walletData));
      }
    }

    getWalletData();
  }, [wallet]);

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
        const savedData = await EncryptedStorage.getItem('userWalletData');
        const emailFromStorage = JSON.parse(savedData).userName;
        const passFromStorage = JSON.parse(savedData).password;
        console.log(emailFromStorage, passFromStorage);
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
          await EncryptedStorage.removeItem('userWalletData');
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
        value={{
          tokenBalance,
          wallet,
          tokenUSD,
          toggleNetwork,
          netColor,
          provider,
          network,
        }}>
        <NavigationContainer>
          {loginState.userToken != null ? <Tabs /> : <RootStackScreen />}
        </NavigationContainer>
      </DataContext.Provider>
    </Authcontext.Provider>
  );
};

export default App;
