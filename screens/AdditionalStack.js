import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SendScreen from './SendScreen';
import Transactions from './Transactions';
import ReceiveScreen from './ReceiveScreen';
import QrScreen from './QrScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import AddWalletScreen from './AddWalletScreen';
const Stack = createNativeStackNavigator();

const AdditionalStack = ({navigation}) => (
  <Stack.Navigator screenOptions={{headerMode: 'none', headerShown: false}}>
    <Stack.Screen name="SendScreen" component={SendScreen} />
    <Stack.Screen name="ReceiveScreen" component={ReceiveScreen} />
    <Stack.Screen name="QrScreen" component={QrScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="AddWalletScreen" component={AddWalletScreen} />
  </Stack.Navigator>
);
export default AdditionalStack;
