import React from 'react';
import {View, ActivityIndicator, Text, Modal} from 'react-native';
import {text} from 'stream/consumers';
import {COLORS} from '../constants';
export const Loading = ({text}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.violent,
      }}>
      <ActivityIndicator color={COLORS.white} size="large" />
      <Text
        style={{
          color: '#FFFF',
          fontWeight: 400,
          fontSize: 16,
          marginTop: 20,
        }}>
        {text}
      </Text>
    </View>
  );
};
