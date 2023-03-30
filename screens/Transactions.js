import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {ethers} from 'ethers';
import {COLORS, icons, SIZES, FONTS} from '../constants';

import {DataContext} from '../App';

const Transactions = ({navigation}) => {
  const {tokenBalance, wallet, tokenUSD} = React.useContext(DataContext);
  const [tokenName, setTokenName] = useState('');
  const [holdings, setHoldings] = useState('');

  // //my holdings
  // const provider = new ethers.providers.JsonRpcProvider(
  //   'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
  // );

  // const contract = new ethers.Contract(wallet.address, abi, provider);

  // useEffect(() => {
  //   async function getHoldings({wallet}) {
  //     try {
  //       const holdingTokens = [];
  //       for (let tokenAddress in tokenBalance) {
  //         const tokenInfo = await fetch(
  //           `https://api.coingecko.com/api/v3/coins/${tokenAddress}`,
  //         ).then(response => response.json());
  //         holdingTokens.push({
  //           symbol: tokenInfo.symbol,
  //           balance: tokenBalance,
  //           name: tokenInfo.name,
  //         });
  //         setHoldings(holdingTokens);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getHoldings();
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.violent,
      }}>
      <Animatable.View
        animation="bounceInDown"
        duration={1000}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SendScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: SIZES.radius,
            width: 150,
            backgroundColor: COLORS.white,
            marginBottom: 20,
          }}>
          <Text
            style={{
              marginLeft: SIZES.base,
              paddingEnd: 10,
            }}>
            Send
          </Text>
          <Image
            source={icons.send}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ReceiveScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: 150,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <Text
            style={{
              marginLeft: SIZES.base,
              paddingEnd: 10,
            }}>
            Receive
          </Text>
          <Image
            source={icons.withdraw}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}></Image>
        </TouchableOpacity>
      </Animatable.View>
      <View style={{paddingLeft: 30}}>
        <Animatable.Text
          style={{fontWeight: 'bold', color: COLORS.white, fontSize: 30}}
          animation="bounceInDown">
          Your Tokens
        </Animatable.Text>
      </View>
      <Animatable.View
        style={{flexDirection: 'row', paddingTop: 20}}
        animation="bounceInUp">
        <Text
          style={{
            color: COLORS.white,
            paddingLeft: 40,
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          Token:
        </Text>
        <Image
          source={icons.eth}
          style={{
            width: 30,
            height: 30,
            tintColor: 'gray1',
            marginTop: 10,
            marginLeft: 40,
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            paddingLeft: 5,
            paddingTop: 10,
          }}>
          {tokenBalance}
        </Text>
      </Animatable.View>
      {/* <ScrollView style={{}}>
        {data.map(element => (
          <View
            key={element.id}
            style={{
              paddingTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Image
              source={{uri: element.symbol}}
              style={{
                height: 30,
                width: 30,
                alignContent: 'flex-start',
              }}
            />
            <TouchableOpacity>
              <Text style={{color: 'white'}}>{element.name}</Text>
            </TouchableOpacity>
            <Text style={{color: COLORS.green}}>${element.tokenBalance}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
};

export default Transactions;
