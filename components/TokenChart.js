import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import {LineChart} from 'react-native-chart-kit';

const TokenChart = ({token}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/v3/coins/${token}/market_chart?vs_currency=usd&days=30`,
      );
      setData(response.data.prices);
    };
    fetchData();
  }, []);

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  return (
    <View>
      <LineChart
        data={{
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={400}
        height={220}
        yAxisLabel={'$'}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default TokenChart;
