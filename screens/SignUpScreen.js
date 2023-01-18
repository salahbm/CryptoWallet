import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, icons} from '../constants';
import createWallet from '../ethersJS/createWallet';
import EncryptedStorage from 'react-native-encrypted-storage';
import {matrixTransform} from 'react-native-svg/lib/typescript/elements/Shape';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUpScreen = ({navigation}) => {
  const [loaded, setLoaded] = useState(true);
  const [wallet, setWallet] = useState({});
  const [data, setData] = useState({
    email: '',
    password: '',
    Confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValideUser: true,
    isValidepassword: true,
  });

  const textInputChange = val => {
    if (val.length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValideUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValideUser: false,
      });
    }
  };

  const handlePassword = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidepassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidepassword: false,
      });
    }
  };
  const handleConfirmPassword = val => {
    setData({
      ...data,
      Confirm_password: val,
      isValidepassword: false,
    });
  };

  const updateSecuretextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValideUser: true,
      });
    } else {
      setData({
        ...data,
        isValideUser: false,
      });
    }
  };

  const updateConfirmSecuretextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  //* WALLET CREATION *//

  useEffect(() => {
    async function getWalletData() {
      const walletData = await EncryptedStorage.getItem('userWallet');

      if (walletData) {
        setWallet(JSON.parse(walletData));
      } else {
        setWallet(createWallet());
        setLoaded(false);
      }
    }
    getWalletData();
  }, []);

  async function save() {
    const mnemonic = wallet.mnemonic;
    const address = wallet.address;
    const privateKey = wallet.privateKey;

    await AsyncStorage.setItem(
      'userWallet',
      JSON.stringify({
        mnemonic,
        address,
        privateKey,
        email: data.email,
        password: data.password,
      }),
    );

    console.log('Sucessfully saved');
    const saved = await AsyncStorage.getItem('userWallet');
    console.log(saved);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Create Wallet
        </Text>
        {!loaded ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              size="large"
              color={COLORS.white}
              style={{marginTop: 300}}
            />
            <Text
              style={{
                color: COLORS.white,
                fontSize: 15,
                textAlign: 'center',
                marginTop: 50,
              }}>
              Please wait {'\n'}
              wallet creation will take up to 30 secs
            </Text>
          </View>
        ) : null}
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Text>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="black" size={20} />
          <TextInput
            placeholder=" Your username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : null}
        </View>
        {data.isValideUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters or more
            </Text>
          </Animatable.View>
        )}

        {/* set passw */}
        <View style={[styles.text_footer, {marginTop: 35}]}>
          <Text>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="black" size={20} />
            <TextInput
              placeholder=" Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePassword(val)}
            />
            <TouchableOpacity onPress={updateSecuretextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* confirm passw */}
        <View style={[styles.text_footer, {marginTop: 35}]}>
          <Text>Confirm Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="black" size={20} />
            <TextInput
              placeholder=" Confirm Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPassword(val)}
            />

            <TouchableOpacity onPress={updateConfirmSecuretextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {data.isValidepassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters or more
            </Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <LinearGradient
            style={[styles.signIn, {borderRadius: 40}]}
            colors={['#0f0c29', '#7902B0']}>
            <TouchableOpacity
              onPress={() => {
                save();

                navigation.navigate('AddWalletScreen');
              }}>
              <Text
                style={[
                  styles.signIn,
                  {
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    height: 20,
                  },
                ]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{paddingTop: 20}}>
          <LinearGradient
            style={{borderRadius: 40}}
            colors={['#0f0c29', '#7902B0']}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                marginTop: 15,
                borderRadius: 10,
              }}>
              <Text
                style={[
                  styles.textSign,
                  {
                    textAlign: 'center',
                    color: 'white',
                    height: 30,
                  },
                ]}>
                Sign in
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.violent,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#fff',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: 'black',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
});