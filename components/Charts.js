// import { LineChart } from 'react-native-chart-kit';
// import { View, Text, TouchableOpacity } from 'react-native';
// import React from 'react';
// const MyComponent = () => {
//   const [data, setData] = useState([]);
//   const [selectedTokenData, setSelectedTokenData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`,
//         )
//         .then(async res => {
//         await setData(res.data);
//         })
//         .catch(err => console.log(err));
//         }, []);

//         const handlePress = (token) => {
//         setSelectedTokenData(token);
//         }

//         return (
//         <View>
//         {data.map(token => (
//         <TouchableOpacity onPress={() => handlePress(token)}>
//         <Text>{token.name}</Text>
//         </TouchableOpacity>
//         ))}
//         {selectedTokenData.length > 0 && (
//         <LineChart
//         data={{
//         labels: selectedTokenData.sparkline_in_7d.price,
//         datasets: [
//         {
//         data: selectedTokenData.sparkline_in_7d.price
//         }
//         ]
//         }}
//         width={Dimensions.get('window').width} // from react-native
//         height={220}
//         yAxisLabel={'$'}
//         chartConfig={{
//         backgroundColor: '#e26a00',
//         backgroundGradientFrom: '#fb8c00',
//         backgroundGradientTo: '#ffa726',
//         decimalPlaces: 2, // optional, defaults to 2dp
//         color: (opacity = 1) => rgba(255, 255, 255, ${opacity}),
//         labelColor: (opacity = 1) => rgba(255, 255, 255, ${opacity}),
//         style: {
//         borderRadius: 16
//         },
//         propsForDots: {
//         r: '6',
//         strokeWidth: '2',
//         stroke: '#ffa726',
//     },
//   }}
//   bezier
//   style={{
//     marginVertical: 8,
//     borderRadius: 16}}
//     />
//     </View>
//         )
//   }}
