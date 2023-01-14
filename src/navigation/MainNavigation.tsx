import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import type {AuthStackParams, MainStackParams} from '../types/navigationTypes';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Notes, {
  screenOptions as notesScreenOptions,
} from '../screens/notes/Notes';
import Note, {screenOptions as noteScreenOptions} from '../screens/notes/Note';
import AddNote from '../screens/notes/AddNote';
import UpdateNote from '../screens/notes/UpdateNote';

const MainNavigatorStack = createStackNavigator<MainStackParams>();

export const MainScreenStack = () => {
  return (
    <MainNavigatorStack.Navigator
      initialRouteName="Notes"
      screenOptions={{headerTintColor: '#8A2BE2'}}>
      <MainNavigatorStack.Screen
        options={notesScreenOptions}
        name="Notes"
        component={Notes}
      />
      <MainNavigatorStack.Screen
        options={noteScreenOptions}
        name="Note"
        component={Note}
      />
      <MainNavigatorStack.Screen name="AddNote" component={AddNote} />
      <MainNavigatorStack.Screen name="UpdateNote" component={UpdateNote} />
    </MainNavigatorStack.Navigator>
  );
};

const AuthNavigatorStack = createStackNavigator<AuthStackParams>();

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
