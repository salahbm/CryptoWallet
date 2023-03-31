import 'react-native-gesture-handler';
import {ethers, providers} from 'ethers';
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import RootStackScreen from './screens/RootStackScreen';
import {COLORS} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DataContext = React.createContext();
import {Loading} from './components/Loading';
const App = () => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenUSD, setTokenUSD] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1100);
    //LOGIN LOGICS
    // Check if there's a logged-in user
    const checkLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        console.log(user);
        if (user) {
          setLoggedInUser(JSON.parse(user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoggedInUser();
  }, []);

  //log out logic

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('loggedInUser');
    //to delete all the data in storage
    await AsyncStorage.removeItem('users');

    setLoggedInUser(null);
  }, []);

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
      const balance = (
        await provider.getBalance(loggedInUser.address)
      ).toString();
      const formatted = ethers.utils.formatUnits(balance, 'ether');

      setTokenBalance(formatted);
    }

    if (loggedInUser !== undefined) {
      getBalance();
    }
  }, [provider, loggedInUser]);

  useEffect(() => {
    async function getBalanceInUSD() {
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

  return (
    <DataContext.Provider
      value={{
        tokenBalance,
        tokenUSD,
        toggleNetwork,
        netColor,
        provider,
        network,
        handleLogout,
        loggedInUser,
        setLoggedInUser,
      }}>
      <NavigationContainer>
        {loading ? <Loading /> : loggedInUser ? <Tabs /> : <RootStackScreen />}
      </NavigationContainer>
    </DataContext.Provider>
  );
};

export default App;
