import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import {COLORS, icons, SIZES, FONTS} from '../constants';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCodeScanner from 'react-native-qrcode-scanner';
const QrScreen = ({navigation}) => {
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();
  const {height} = Dimensions.get('window');
  onSucces = e => {
    setResult(e.data);
    setScan(false);
  };
  startScan = () => {
    setScan(true);
    setResult();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.violent,
        paddingTop: height === 700 ? 60 : 45,
      }}>
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.leftarrow}
            style={{tintColor: COLORS.white, height: 15, width: 15}}
          />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        {result && (
          <View style={{marginVertical: 50}}>
            <TouchableOpacity onPress={() => Clipboard.setString(result)}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  marginBottom: 450,
                }}>
                {result}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            width: 60,
            height: 60,
            marginTop: 90,
          }}>
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={node => {
              this.scanner = node;
            }}
            onRead={this.onSucces}
            bottomContent={
              <TouchableOpacity onPress={() => setScan(false)}>
                <Text style={{color: COLORS.white}}> OK</Text>
              </TouchableOpacity>
            }></QRCodeScanner>
        </View>
      </View>
    </View>
  );
};

export default QrScreen;
