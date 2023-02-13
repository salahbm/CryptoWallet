import axios from 'axios';

import React, {useContext, useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {COLORS, icons} from '../constants';
import {DataContext} from '../App';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
  LineChart,
} from '@rainbow-me/animated-charts';
import moment from 'moment';
import Chart from '../components/Chart';
const {width: SIZE} = Dimensions.get('window');
const Home = () => {
  const [coin, SetCoin] = useState([]);
  const [searchedCoin, setSearchedCoin] = useState([]);
  const [searchedText, setSearchedText] = useState([]);
  const {tokenBalance, wallet, tokenUSD} = React.useContext(DataContext);
  // getting tokens through coingecko api
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`,
      )
      .then(async res => {
        await SetCoin(res.data);

        await setSearchedText(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // search logic
  const handleSearch = e => {
    const exData = [...coin];
    const newData = exData.filter(ex => {
      return ex.id.startsWith(e);
    });
    setSearchedText(newData);
  };

  //charts
  // console.log(coin);
  const handleSearchedCoin = element => {
    setSearchedCoin(element);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.powderBlue,
          // borderRadius: 90,
          paddingTop: 10,
          borderBottomLeftRadius: 90,
          borderBottomRightRadius: 90,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: COLORS.white,
              paddingLeft: 50,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Balance:
          </Text>
          <Text
            style={{
              color: 'yellow',
              fontSize: 20,
              paddingLeft: 30,
              paddingTop: 10,
            }}>
            {'$'}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              paddingLeft: 5,
              paddingTop: 10,
            }}>
            {tokenUSD}
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          <Text
            style={{
              color: COLORS.white,
              paddingLeft: 50,
              fontSize: 30,
              fontWeight: 'bold',
              paddingBottom: 5,
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
              color: 'black',
              fontSize: 20,
              paddingLeft: 5,
              paddingTop: 10,
            }}>
            {tokenBalance}
          </Text>
        </View>
      </View>
      <View
        style={{paddingTop: 5, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Seach Token"
          placeholderTextColor={'white'}
          textAlign="center"
          style={{
            borderWidth: 1,
            borderColor: COLORS.powderBlue,
            backgroundColor: COLORS.powderBlue,
            borderRadius: 40,
            width: 250,
            color: COLORS.white,
          }}
          onChangeText={val => handleSearch(val)}></TextInput>
      </View>

      <View>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
            paddingLeft: 15,
            paddingTop: 5,
          }}>
          Scroll Up
        </Text>
      </View>

      <View style={{overflow: 'visible'}}>
        <ScrollView style={{height: 320}}>
          {searchedText.map(element => (
            <View
              key={element.id}
              style={{
                paddingTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                source={{uri: element.image}}
                style={{
                  height: 30,
                  width: 30,
                  alignContent: 'flex-start',
                }}
              />
              <TouchableOpacity
                key={element.id}
                onPress={() => handleSearchedCoin(element)}>
                <Text style={{color: 'white'}}>{element.name}</Text>
              </TouchableOpacity>
              <Text style={{color: COLORS.green}}>
                ${element.current_price}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {searchedCoin?.sparkline_in_7d?.price ? (
        <Chart chartPrices={searchedCoin.sparkline_in_7d?.price} />
      ) : (
        <View
          style={{
            marginTop: 50,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
            }}>
            choose the coin for the chart
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.violent, flex: 1},
});
