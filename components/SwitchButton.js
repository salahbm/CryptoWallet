import React, {useEffect, useState} from 'react';
import {ethers, providers} from 'ethers';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../constants';
export const SwitchButton = props => {
  // Initialize state variables for network and provider
  const [network, setNetwork] = useState('choose');
  const [provider, setProvider] = useState(
    new ethers.providers.StaticJsonRpcProvider(
      'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
    ),
  );
  const [netColor, setNetColor] = useState(COLORS.white);

  // function to toggle the network
  const toggleNetwork = () => {
    if (network === 'mainnet') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-rinkeby.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
        ),
      );
      setNetwork('testnet');
      setNetColor('orange');
    } else {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
        ),
      );
      setNetwork('mainnet');
      setNetColor(COLORS.green);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 25,

        //  justifyContent: 'space-between',
      }}>
      <Text style={{color: netColor, paddingEnd: 30}}>
        {network}
        {/* {console.log(provider)} */}
      </Text>
      <TouchableOpacity onPress={toggleNetwork}>
        <Text
          style={{
            color: COLORS.violent,
            borderRadius: 40,
            backgroundColor: 'white',
            width: 60,
            textAlign: 'center',
          }}>
          change
        </Text>
      </TouchableOpacity>
    </View>
  );
};
