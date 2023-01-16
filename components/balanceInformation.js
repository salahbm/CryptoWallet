import React, {useEffect, useState} from 'react';
import {ethers, providers} from 'ethers';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../constants';
export const balanceInformation = async (address, provider) => {
  provider = new ethers.providers.StaticJsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
  );

  const balance = (await provider.getBalance(address)).toString();
  const formatted = ethers.utils.formatUnits(balance, 'ether');

  return formatted;
};
