import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, icons} from '../constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {WebView} from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import {DataContext} from '../App';
const ReceiveScreen = ({navigation}) => {
  const {tokenBalance, loggedInUser, tokenUSD} = useContext(DataContext);
  const {height} = Dimensions.get('window');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.violent,
        paddingTop: height === 700 ? 60 : 45,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={icons.leftarrow}
          style={{
            tintColor: COLORS.white,
            height: 15,
            width: 15,
            marginLeft: 24,
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
        <TouchableOpacity
          onPress={() => Clipboard.setString(loggedInUser?.address)}>
          <Text
            style={[{color: COLORS.green, width: 250, fontSize: 20}]}
            ellipsizeMode="middle"
            numberOfLines={1}>
            {loggedInUser?.address}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation={'swing'}
        style={{alignContent: 'center', alignItems: 'center', marginTop: 50}}>
        <QRCode value={loggedInUser.address} size={250} />
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
