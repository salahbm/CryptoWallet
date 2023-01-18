import {ethers} from 'ethers';
import React, {useEffect, useState, Component, useContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, icons, FONTS} from '../constants';
import {DataContext} from '../App';

const SendScreen = ({navigation}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(undefined);
  const [result, onChangeResult] = useState('(result)');
  const {tokenBalance, wallet, tokenUSD} = useContext(DataContext);

  // Connection
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
  );

  async function sendTx() {
    // const gasPrice = await provider.getGasPrice();
    // const gasPrice = ethers.utils.parseUnits('5', 'gwei');
    const signer = new ethers.Wallet(wallet.privateKey);

    const tx = {
      from: wallet.address,
      to: recipient,
      value: ethers.utils.parseUnits(amount, 'ether'),
      //value: ethers.utils.parseEther('0.1'),
      // gasPrice: gasPrice,
      gasPrice: ethers.utils.hexlify(5000000000),

      gasLimit: ethers.utils.hexlify(21000),
      nonce: await provider.getTransactionCount(wallet.address, 'latest'),
    };

    const signed = await signer.signTransaction(tx);
    const transaction = await provider.sendTransaction(signed);

    setStatus('pending');

    const pending = await transaction.wait();

    setStatus('sent');
    setAmount('');
    setRecipient('');
  }

  useEffect(() => {
    async function cleanTheBox(transaction) {
      if (transaction) {
        let transaction = onChangeResult(result);
      } else {
        return;
      }
    }
    cleanTheBox();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.violent,
        paddingTop: 20,
        paddingLeft: 15,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={icons.leftarrow}
          style={{tintColor: COLORS.white, height: 15, width: 15}}
        />
      </TouchableOpacity>

      <Animatable.View
        style={styles.views}
        animation="bounceInLeft"
        duration={1500}>
        <Text style={styles.text}>From:</Text>
        <TouchableOpacity onPress={() => Clipboard.setString(wallet?.address)}>
          <Text style={styles.text1} ellipsizeMode="middle" numberOfLines={1}>
            {wallet?.address}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      <View style={{flexDirection: 'row'}}>
        <Animatable.View
          style={{
            paddingLeft: 15,
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: 1,
            alignItems: 'center',
            borderColor: COLORS.powderBlue,
            width: '90%',
          }}
          animation="bounceInRight"
          duration={1500}>
          <Text style={[styles.text, {paddingLeft: 14}]}>To:</Text>
          <TouchableOpacity>
            <TextInput
              style={[styles.text1, {paddingLeft: 33}]}
              ellipsizeMode="middle"
              numberOfLines={1}
              placeholder="Recepient"
              placeholderTextColor={COLORS.bluish}
              value={recipient}
              onChangeText={val => setRecipient(val)}></TextInput>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          style={{
            marginTop: 45,
            paddingLeft: 5,
          }}
          animation="bounceInRight"
          duration={1500}>
          <TouchableOpacity onPress={() => navigation.navigate('QrScreen')}>
            <Image
              source={icons.qrCode}
              style={{width: 35, height: 35, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <Animatable.View
        style={styles.views}
        animation="bounceInUp"
        duration={1500}>
        <Text style={styles.text}>Value:</Text>
        <TouchableOpacity>
          <TextInput
            style={styles.text1}
            placeholder="Token"
            placeholderTextColor={COLORS.bluish}
            value={amount}
            onChangeText={val => setAmount(val)}></TextInput>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation="bounceIn"
        duration={1500}
        style={{
          marginHorizontal: '29%',
          marginTop: 60,
        }}>
        <TouchableOpacity
          onPress={() => {
            sendTx();
          }}>
          <Text
            style={{
              backgroundColor: COLORS.white,
              textAlign: 'center',
              borderRadius: 30,
              height: 30,
              paddingTop: 5,
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      {status ? (
        <Animatable.View
          animation="bounceInDown"
          duration={1500}
          style={styles.views}>
          <Text style={styles.text}>Status:</Text>
          <Text style={styles.text1} ellipsizeMode="middle" numberOfLines={1}>
            {status}
          </Text>
        </Animatable.View>
      ) : null}
    </View>
  );
};

export default SendScreen;
const styles = StyleSheet.create({
  views: {
    paddingLeft: 15,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: COLORS.powderBlue,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
  },
  text1: {
    color: COLORS.bluish,
    fontSize: 20,
    fontWeight: '500',
    width: 150,
  },
});
