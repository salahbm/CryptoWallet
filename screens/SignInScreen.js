import React, {useState} from 'react';
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
import {Authcontext} from '../components/context';

const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValideUser: true,
    isValidepassword: true,
  });

  const {signIn} = React.useContext(Authcontext);

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValideUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
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

  const updateSecuretextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (username, password) => {
    signIn(username, password);
    if (username != data.username && password != data.password) {
      Alert.alert('Invalid user', 'username or password is wrong', [
        {text: 'Ok'},
      ]);
      return;
    }
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
          {data.isValidepassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters or more
              </Text>
            </Animatable.View>
          )}
        </View>
        <View style={styles.button}>
          <LinearGradient
            style={[styles.signIn, {borderRadius: 40}]}
            colors={['#0f0c29', '#7902B0']}>
            <TouchableOpacity
              onPress={() => {
                loginHandle(data.username, data.password);
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
                Sign in
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{paddingTop: 20}}>
          <LinearGradient
            style={{borderRadius: 50}}
            colors={['#0f0c29', '#7902B0']}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
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
                    height: 40,
                  },
                ]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </LinearGradient>
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
