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
import {SwitchButton} from '../components/balanceInformation';
const Settings = () => {
  const {tokenBalance, wallet, tokenUSD} = useContext(DataContext);

  const {signOut} = React.useContext(Authcontext);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 50,
          paddingLeft: 110,
        }}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          paddingLeft: 40,
          flexDirection: 'row',
        }}>
        <Image
          source={icons.user}
          style={{
            width: 70,
            height: 70,
            tintColor: COLORS.white,
            marginEnd: 20,
          }}
        />
        <Text style={styles.text}>{wallet?.email}</Text>
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
        {/* <Text style={[styles.text1, {color: 'orange'}]}>{'Goerli'}</Text> */}
        <SwitchButton></SwitchButton>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 300,
          paddingLeft: 50,
        }}>
        <TouchableOpacity
          onPress={async () => {
            signOut();
            await EncryptedStorage.removeItem('userWallet');
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,

              marginEnd: 10,
            }}>
            {'Log Out'}
          </Text>
        </TouchableOpacity>
        <Image
          source={icons.logout}
          style={{
            width: 30,
            height: 30,
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
    fontSize: 25,
    paddingTop: 20,
    marginEnd: 50,
    fontWeight: 'bold',
  },
  text1: {color: COLORS.white, fontSize: 20, paddingTop: 20},
});
