import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';

import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenStack, MainScreenStack} from './MainNavigation';

export type RootStackParams = {
  AuthStack: undefined;
  MainStack: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const isAuth = useAppSelector(state => !!state.auth.accessToken);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        {isAuth && (
          <RootStack.Screen name="MainStack" component={MainScreenStack} />
        )}
        {!isAuth && (
          <RootStack.Screen name="AuthStack" component={AuthScreenStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
