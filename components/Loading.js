import React from 'react';
import {View, ActivityIndicator, Text, Modal} from 'react-native';
import {text} from 'stream/consumers';
import {COLORS} from '../constants';
export const Loading = ({text}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        top: 200,
      }}>
      <ActivityIndicator color={COLORS.white} size="large" />
      <Text
        style={{
          color: 'white',
          fontWeight: 400,
          fontSize: 16,
          marginTop: 20,
        }}>
        {text}
      </Text>
    </View>
  );
};
