import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SendScreen from './SendScreen';
import Transactions from './Transactions';
import ReceiveScreen from './ReceiveScreen';
import QrScreen from './QrScreen';
const Stack = createNativeStackNavigator();

const TransactionsStack = ({navigation}) => (
  <Stack.Navigator screenOptions={{headerMode: 'none', headerShown: false}}>
    <Stack.Screen name="Transactions" component={Transactions} />
    <Stack.Screen name="SendScreen" component={SendScreen} />
    <Stack.Screen name="ReceiveScreen" component={ReceiveScreen} />
    <Stack.Screen name="QrScreen" component={QrScreen} />
  </Stack.Navigator>
);
export default TransactionsStack;
