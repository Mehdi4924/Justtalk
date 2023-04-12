import React, {Component, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation';
import AppNavigation from './appNavigation';
import {routes} from '../services';
import {Splash} from '../screens/authFlow';
import {navigationRef} from './rootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainStack = createNativeStackNavigator();

export default function Navigation() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useEffect(() => {
    getToken();
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });
  const getToken = async () => {
    const dtoken = await AsyncStorage.getItem('Token');
    console.log('thia is tokn on splash', dtoken);
    setToken(dtoken);
  };

  if (loading) return <Splash />;
  else
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
        //   initialRouteName={routes.auth}
          >
          {token == null ? (
            <>
              <MainStack.Screen name={routes.auth} component={AuthNavigation} />
              <MainStack.Screen name={routes.app} component={AppNavigation} />
            </>
          ) : (
            <>
              <MainStack.Screen name={routes.app} component={AppNavigation} />
              <MainStack.Screen name={routes.auth} component={AuthNavigation} />
            </>
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    );
}
