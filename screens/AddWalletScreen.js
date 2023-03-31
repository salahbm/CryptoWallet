import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import * as Animatable from 'react-native-animatable';
import Clipboard from '@react-native-clipboard/clipboard';
const AddWalletScreen = ({navigation}) => {
  const [mnemonic, setMnemonic] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const {height} = Dimensions.get('window');
  useEffect(() => {
    const getLatestUser = async () => {
      try {
        const users = await AsyncStorage.getItem('users');
        const parsedUsers = JSON.parse(users);
        const latestUser = parsedUsers[parsedUsers.length - 1];
        setMnemonic(latestUser.mnemonic);
        setPrivateKey(latestUser.privateKey);
      } catch (error) {
        console.log(error, 'error getting users');
      }
    };

    getLatestUser();
  }, []);
  return (
    <View
      style={{
        backgroundColor: COLORS.violent,
        flex: 1,
      }}>
      <Animatable.View
        animation="fadeInDown"
        style={{marginTop: height === 700 ? 100 : 75, alignItems: 'center'}}>
        <Text
          style={{
            color: COLORS.white,
            fontStyle: 'normal',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          Your Wallet Information
        </Text>
      </Animatable.View>
      <Animatable.View
        animation="fadeInDown"
        style={{justifyContent: 'center'}}>
        <Text
          style={{
            color: COLORS.powderBlue,
            marginVertical: 30,

            paddingHorizontal: 10,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
          }}>
          Your Mnemonic:
        </Text>
        <TouchableOpacity onPress={() => Clipboard.setString(mnemonic)}>
          <Text
            style={{
              margin: 10,
              textAlign: 'center',
              fontSize: 16,
              color: COLORS.white,
              paddingBottom: 25,
              textAlign: 'center',
            }}>
            {mnemonic}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: COLORS.powderBlue,

            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
            marginVertical: 20,
          }}>
          Your Private Key:
        </Text>
        <TouchableOpacity onPress={() => Clipboard.setString(privateKey)}>
          <Text
            style={{
              margin: 10,
              textAlign: 'center',
              fontSize: 16,
              color: COLORS.white,
              paddingBottom: 55,
            }}>
            {privateKey}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: COLORS.white,
            textAlign: 'center',
            position: 'absolute',
            bottom: 120,
            marginHorizontal: 20,
          }}>
          Your Wallet Details Should be Secured. Please, Write Down Your
          Mnemonic Code or Take ScreenShot
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInScreen')}
          style={{
            width: '90%',
            backgroundColor: COLORS.powderBlue,
            height: 50,
            alignSelf: 'center',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 40,
          }}>
          <Text style={{fontWeight: '600', fontSize: 15, color: 'white'}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddWalletScreen;
