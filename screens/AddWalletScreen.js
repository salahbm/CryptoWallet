import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import * as Animatable from 'react-native-animatable';
const AddWalletScreen = ({navigation}) => {
  const [wallet, setWallet] = useState();
  useEffect(() => {
    async function getWalletData() {
      const walletData = await AsyncStorage.getItem('user');
      //console.log(walletData);
      if (walletData) {
        setWallet(JSON.parse(walletData));
      }
    }

    getWalletData();
  }, []);
  return (
    <View
      style={{
        backgroundColor: COLORS.violent,
        flex: 1,
      }}>
      <Animatable.View
        animation="fadeInDown"
        style={{paddingTop: 30, flexDirection: 'row'}}>
        <View style={{paddingLeft: 15, paddingEnd: 25, paddingTop: 20}}>
          {/* <TouchableOpacity>
            <Image
              source={icons.leftarrow}
              style={{tintColor: 'white', width: 25, height: 25}}
              icon={icons.craeteWallet}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity> */}
        </View>
        <Text
          style={{
            color: COLORS.white,
            fontStyle: 'normal',
            fontSize: 45,
            fontWeight: 'bold',

            paddingBottom: 10,
          }}>
          Create Wallet
        </Text>
      </Animatable.View>
      <Animatable.View animation="fadeInDown" style={{}}>
        <Text
          style={{
            color: COLORS.powderBlue,
            paddingTop: 20,
            ...FONTS.h3,
            paddingHorizontal: 10,
            textAlign: 'center',
          }}>
          Your Mnemonic:
        </Text>
        <TouchableOpacity
        // onPress={() => Clipboard.setString(wallet.mnemonic)}
        >
          <Text
            style={{
              margin: 10,
              textAlign: 'center',
              fontSize: 16,
              color: COLORS.white,
              paddingBottom: 25,
              textAlign: 'center',
            }}
            onChangeText={text => onChangeKey(text)}>
            {wallet.mnemonic}
            {console.log(wallet.mnemonic)}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: COLORS.powderBlue,
            paddingTop: 20,
            ...FONTS.h3,
            paddingHorizontal: 10,
            textAlign: 'center',
          }}>
          Your Private Key:
        </Text>
        <TouchableOpacity
        //   onPress={() => Clipboard.setString(wallet.privateKey)}
        >
          <Text
            style={{
              margin: 10,
              textAlign: 'center',
              fontSize: 16,
              color: COLORS.white,
              paddingBottom: 25,
              paddingBottom: 140,
            }}>
            {wallet.privateKey}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      <View>
        <TouchableOpacity>
          <Button
            title="ok"
            onPress={() => navigation.navigate('SignInScreen')}></Button>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: COLORS.white,
          textAlign: 'center',
          marginTop: 170,
          marginHorizontal: 15,
        }}>
        Your Wallet Details Should be Secured. Please, Write Down Your Mnemonic
        Code or Take ScreenShot
      </Text>
    </View>
  );
};

export default AddWalletScreen;
