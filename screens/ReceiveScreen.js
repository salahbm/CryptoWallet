import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, icons} from '../constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {WebView} from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import {DataContext} from '../App';
const ReceiveScreen = ({navigation}) => {
  const {tokenBalance, wallet, tokenUSD} = useContext(DataContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.violent,
        paddingTop: 20,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={icons.leftarrow}
          style={{
            tintColor: COLORS.white,
            height: 15,
            width: 15,
            marginLeft: 15,
          }}
        />
      </TouchableOpacity>
      <Animatable.View
        animation={'bounceInDown'}
        style={{alignContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: COLORS.white,

            paddingBottom: 50,
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          Your PK
        </Text>
        <TouchableOpacity onPress={() => Clipboard.setString(wallet?.address)}>
          <Text
            style={[{color: COLORS.green, width: 250, fontSize: 20}]}
            ellipsizeMode="middle"
            numberOfLines={1}>
            {wallet?.address}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation={'swing'}
        style={{alignContent: 'center', alignItems: 'center', marginTop: 50}}>
        <QRCode value={wallet.address} size={250} />
        <Text
          style={{
            color: COLORS.white,
            paddingTop: 40,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Scan me
        </Text>
      </Animatable.View>
    </View>
  );
};

export default ReceiveScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});
