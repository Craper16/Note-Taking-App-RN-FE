import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Notes from '../screens/notes/Notes';
import Note from '../screens/notes/Note';

export type MainStackParams = {
  Notes: undefined;
  Note: {noteId: string};
};

const MainNavigatorStack = createStackNavigator<MainStackParams>();

export const MainScreenStack = () => {
  return (
    <MainNavigatorStack.Navigator
      initialRouteName="Notes"
      screenOptions={{headerTintColor: '#8A2BE2'}}>
      <MainNavigatorStack.Screen name="Notes" component={Notes} />
      <MainNavigatorStack.Screen name="Note" component={Note} />
    </MainNavigatorStack.Navigator>
  );
};

const AuthNavigatorStack = createStackNavigator<AuthStackParams>();

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
};

export const AuthScreenStack = () => {
  return (
    <AuthNavigatorStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerTintColor: '#8A2BE2'}}>
      <AuthNavigatorStack.Screen name="Login" component={Login} />
      <AuthNavigatorStack.Screen name="Signup" component={Signup} />
    </AuthNavigatorStack.Navigator>
  );
};
