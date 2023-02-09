import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, icons} from '../constants';
import {Authcontext} from '../components/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import {DataContext} from '../App';
import {SwitchButton} from '../components/SwitchButton';

const Settings = ({navigation}) => {
  const {
    tokenBalance,
    wallet,
    tokenUSD,
    toggleNetwork,
    netColor,
    provider,
    network,
  } = useContext(DataContext);

  const {signOut} = React.useContext(Authcontext);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 50,
        }}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          paddingLeft: 50,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.text}>Welcome:</Text>
        <Text style={styles.text}>{wallet?.userName}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          paddingLeft: 50,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.text1}>Wallet:</Text>
        <TouchableOpacity onPress={() => Clipboard.setString(wallet?.address)}>
          <Text
            style={[styles.text1, {color: COLORS.green, width: 150}]}
            ellipsizeMode="middle"
            numberOfLines={1}>
            {wallet?.address}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          paddingLeft: 50,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.text1}>{'Network type'}:</Text>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
          }}>
          <Text
            style={{
              color: netColor,
              marginEnd: 30,
              width: 70,
              height: 20,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              textAlign: 'center',

              alignItems: 'center',
            }}>
            {network}
          </Text>
          <TouchableOpacity
            onPress={toggleNetwork}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              height: 20,
              backgroundColor: COLORS.white,
              borderRadius: 40,
            }}>
            <Image
              source={icons.swap}
              style={{
                width: 17,
                height: 17,
                marginLeft: 2,
                tintColor: COLORS.black,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 20,
                backgroundColor: COLORS.white,
                borderRadius: 40,
                color: COLORS.black,

                textAlign: 'center',
              }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          paddingLeft: 50,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.text1}>{'Create New Account'}:</Text>
        <TouchableOpacity
          onPress={async () => {
            signOut();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            height: 20,
            backgroundColor: COLORS.white,
            borderRadius: 40,
            marginBottom: 200,
          }}>
          <Image
            source={icons.user}
            style={{
              width: 40,
              height: 40,

              tintColor: COLORS.black,
            }}
          />
          <Text
            style={{
              color: COLORS.black,
              fontSize: 10,
              alignItems: 'center',
              marginRight: 10,
            }}>
            New User
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',

          paddingLeft: 50,
        }}>
        <TouchableOpacity
          onPress={async () => {
            signOut();
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,

              marginEnd: 10,
            }}>
            {'Log Out'}
          </Text>
        </TouchableOpacity>
        <Image
          source={icons.logout}
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
          }}></Image>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: COLORS.violent,
  },
  header: {
    color: COLORS.powderBlue,
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    paddingTop: 20,
    marginEnd: 50,
    fontWeight: 'bold',
  },
  text1: {color: COLORS.white, fontSize: 15, paddingTop: 20},
});
