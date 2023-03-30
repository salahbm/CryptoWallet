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
    async function getBalance() {
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

  // if (isLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color={COLORS.violent} />
  //     </View>
  //   );
  // }
  return (
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
        {/* {loginState != null ? <Tabs /> :  */}
        <RootStackScreen />
      </NavigationContainer>
    </DataContext.Provider>
  );
};

export default App;
