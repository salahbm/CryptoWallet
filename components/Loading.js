import React from 'react';
import {View, ActivityIndicator, Text, Modal} from 'react-native';
import {text} from 'stream/consumers';
import {COLORS} from '../constants';
export const Loading = ({loading, text}) => {
  return (
    <View
      style={{
        top: 200,
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: COLORS.violent,
      }}>
      <ActivityIndicator color={'#FFFF'} size="large" />
      <Text
        style={{color: '#FFFF', fontWeight: 400, fontSize: 16, marginTop: 15}}>
        {text}
      </Text>
    </View>
  );
};
