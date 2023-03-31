import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import {COLORS, icons} from '../constants';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import TransactionsStack from '../screens/TransactionStack';
const Tab = createBottomTabNavigator();

const TransactionsButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: COLORS.powderBlue,
        ...styles.shadow,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      const {routeName} = e.state;
      if (
        routeName !== 'Home' &&
        routeName !== 'TransactionsStack' &&
        routeName !== 'Settings'
      ) {
        navigation.setOptions({tabBarVisible: false});
      } else {
        navigation.setOptions({tabBarVisible: true});
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.powderBlue,
          position: 'absolute',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 0,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.bluish : COLORS.white,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.bluish : COLORS.white,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TransactionsStack"
        component={TransactionsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.trade}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? COLORS.white : COLORS.white,
              }}
            />
          ),

          tabBarButton: props => <TransactionsButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.bluish : COLORS.white,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.bluish : COLORS.white,
                }}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
