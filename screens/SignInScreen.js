import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {icons, COLORS} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../App';
const SignInScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [data, setData] = useState({
    validUser: false,
    isValidepassword: false,
    hide: true,
  });
  const {setLoggedInUser} = useContext(DataContext);

  const getUsername = val => {
    setUsername(val);
    if (val.trim().length >= 4) {
      setData({
        ...data,
        validUser: false,
      });
    } else {
      setData({
        ...data,
        validUser: true,
      });
    }
  };

  const getPassword = val => {
    setPassword(val);
    if (val.trim().length >= 8) {
      setData({
        ...data,
        isValidepassword: false,
      });
    } else {
      setData({
        ...data,
        isValidepassword: true,
      });
    }
  };
  function updateVisivility() {
    setData({
      ...data,
      hide: !data.hide,
    });
  }

  const handleLogin = async () => {
    try {
      const users = await AsyncStorage.getItem('users');
      console.log(users);
      let parsedUsers = [];
      if (users) {
        parsedUsers = JSON.parse(users);
      }
      const user = parsedUsers.find(
        user => user.password === password && user.username === username,
      );
      if (user) {
        // change the stack if user is available

        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
        setLoggedInUser(user);

        setPassword('');
        setUsername('');
        // Clear the username and password fields
      } else {
        console.log('Incorrect username or password');
        setPassword('');
        setUsername('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Connect the Wallet
        </Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="black" size={20} />
          <TextInput
            placeholder=" Your Username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={getUsername}
            value={username}
          />
          {username.length >= 4 && (
            <Feather name="check-circle" color="green" size={20} />
          )}
        </View>
        {data.validUser && (
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
              secureTextEntry={data.hide ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={getPassword}
              value={password}
            />
            <TouchableOpacity onPress={updateVisivility}>
              {data.hide ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidepassword && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters or more
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={{position: 'absolute', width: '100%', bottom: 80}}
            onPress={() => {
              handleLogin();
            }}>
            <LinearGradient
              style={[styles.signIn, {borderRadius: 40}]}
              colors={['#0f0c29', '#7902B0']}>
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
                Sign in
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={{position: 'absolute', width: '100%', bottom: 20}}>
            <LinearGradient
              style={styles.signIn}
              colors={['#0f0c29', '#7902B0']}>
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
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
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
    flex: 1.5,
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
