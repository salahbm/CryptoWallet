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

import {LineChart} from 'react-native-chart-kit';
import {COLORS, icons} from '../constants';

const dimentions = Dimensions.get('screen');

const {width: SIZE} = Dimensions.get('window');
import {DataContext} from '../App';

const chartConfig = {
  backgroundGradientFrom: COLORS.violent,
  backgroundGradientTo: COLORS.violent,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
};

const Home = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [searchedText, setSearchedText] = useState([]);
  const {tokenBalance, wallet, tokenUSD} = React.useContext(DataContext);
  // getting tokens through coingecko api
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d`,
      )
      .then(async res => {
        await setData(res.data);
        await setSearchedText(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // search logic
  const handleSearch = e => {
    const exData = [...data];
    const newData = exData.filter(ex => {
      return ex.id.startsWith(e);
    });
    setSearchedText(newData);
    setLoaded(false);
  };

  //charts

  state = {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [15600, 18011, 17566, 17000, 13429, 15460, 14589, 18829],
        },
      ],
    },
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
      {!loaded ? (
        <ScrollView>
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
              <TouchableOpacity>
                <Text style={{color: 'white'}}>{element.name}</Text>
              </TouchableOpacity>
              <Text style={{color: COLORS.green}}>
                ${element.current_price}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          color={COLORS.white}
          style={{marginTop: 150, marginBottom: 50}}
        />
      )}
      {loaded ? (
        <View style={{marginBottom: 70, paddingBottom: 10}}>
          <LineChart
            data={this.state.data}
            width={Dimensions.get('window').width}
            height={220}
            yAxisLabel={'$'}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color={COLORS.white}
          style={{marginTop: 100, marginBottom: 100}}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.violent, flex: 1},
});
