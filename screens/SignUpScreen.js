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
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, icons} from '../constants';
import createWallet from '../ethersJS/createWallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../components/Loading';
const SignUpScreen = ({navigation}) => {
  const [wallet, setWallet] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState({
    userLength: false,
    passwordLength: false,
    confirmPasswordLength: false,
    hide: true,
  });
  useEffect(() => {
    function createRandomWallet() {
      if (loading === true) {
        setTimeout(() => {
          setWallet(createWallet);
        }, 200);
      }
    }
    createRandomWallet();
  }, [loading]);

  const storeData = async () => {
    try {
      const user = {
        confirmPassword: confirmPassword,
        password: password,
        username: username,
        mnemonic: wallet.mnemonic,
        address: wallet.address,
        privateKey: wallet.privateKey,
      };
      const users = await AsyncStorage.getItem('users');
      let parsedUsers = [];
      if (users) {
        parsedUsers = JSON.parse(users);
      }
      parsedUsers.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
      const saved = await AsyncStorage.getItem('users');
      console.log(JSON.parse(saved));
    } catch (error) {
      console.log(error, 'error creating wallet');
    } finally {
      setLoading(false);
      navigation.navigate('AddWalletScreen');
    }
  };

  const fetchData = async () => {
    if (password.length >= 8 && confirmPassword.length >= 8) {
      if (password === confirmPassword) {
        setLoading(true);
        if (wallet.address !== undefined) {
          await storeData();
        } else {
          console.log('wallet data is not defined yet');
        }
      } else {
        console.log('cant store data it is invalid');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [wallet]);

  // // check inputs

  const textInputChange = val => {
    setUsername(val);
    if (val.length >= 4) {
      setLength({
        ...length,
        userLength: false,
      });
    } else {
      setLength({
        ...length,
        userLength: true,
      });
    }
  };
  const handlePassword = val => {
    setPassword(val);
    if (val.length >= 8) {
      setLength({
        ...length,
        passwordLength: false,
      });
    } else {
      setLength({
        ...length,
        passwordLength: true,
      });
    }
  };

  const handleConfirmPassword = val => {
    setConfirmPassword(val);
    if (val.length >= 8) {
      setLength({
        ...length,
        confirmPasswordLength: false,
      });
    } else {
      setLength({
        ...length,
        confirmPasswordLength: true,
      });
    }
  };

  function updateVisivility() {
    setLength({
      ...length,
      hide: !length.hide,
    });
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading text={' Wallet is being created, Please wait ...'} />
      ) : (
        <>
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
          </View>

          <Animatable.View style={styles.footer} animation="fadeInUp">
            <Text>Username</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="black" size={20} />
              <TextInput
                placeholder=" Your username"
                style={styles.textInput}
                onChangeText={textInputChange}
                value={username}
                autoCapitalize="none"
              />
              {username.length >= 4 && (
                <Feather name="check-circle" color="green" size={20} />
              )}
            </View>

            {length.userLength && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Username must be 4 characters or more
                </Text>
              </Animatable.View>
            )}

            <View style={[styles.text_footer, {marginTop: 35}]}>
              <Text>Password</Text>
              <View style={styles.action}>
                <FontAwesome name="lock" color="black" size={20} />
                <TextInput
                  placeholder=" Your Password"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handlePassword}
                  value={password}
                  secureTextEntry={length.hide ? true : false}
                />
                <TouchableOpacity onPress={updateVisivility}>
                  {length.hide ? (
                    <Feather name="eye-off" color="gray" size={20} />
                  ) : (
                    <Feather name="eye" color="gray" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {length.passwordLength && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 8 characters or more
                  </Text>
                </Animatable.View>
              )}
            </View>

            <View style={[styles.text_footer, {marginTop: 35}]}>
              <Text>Confirm Password</Text>
              <View style={styles.action}>
                <FontAwesome name="lock" color="black" size={20} />
                <TextInput
                  placeholder=" Confirm Password"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleConfirmPassword}
                  value={confirmPassword}
                  secureTextEntry={length.hide ? true : false}
                />

                <TouchableOpacity onPress={updateVisivility}>
                  {length.hide ? (
                    <Feather name="eye-off" color="gray" size={20} />
                  ) : (
                    <Feather name="eye" color="gray" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {length.confirmPasswordLength && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters or more
                </Text>
              </Animatable.View>
            )}

            {password.length !== confirmPassword.length && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password doest match</Text>
              </Animatable.View>
            )}
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => fetchData()}
                style={{position: 'absolute', width: '100%', bottom: 80}}>
                <LinearGradient
                  colors={['#0f0c29', '#7902B0']}
                  style={styles.signIn}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      height: 20,
                    }}>
                    Sign up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={{position: 'absolute', width: '100%', bottom: 20}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <LinearGradient
                  colors={['#0f0c29', '#7902B0']}
                  style={styles.signIn}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      height: 20,
                    }}>
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </>
      )}
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
    flex: 1,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
});
