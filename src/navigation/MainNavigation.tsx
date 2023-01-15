import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {
  AuthStackParams,
  BottomRootStackNavigatorParams,
  MainStackParams,
  SettingsNavigatorStackParams,
  CategoryNavigatorStackParams,
} from '../types/navigationTypes';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Notes, {
  screenOptions as notesScreenOptions,
} from '../screens/notes/Notes';
import Note, {screenOptions as noteScreenOptions} from '../screens/notes/Note';
import AddNote from '../screens/notes/AddNote';
import UpdateNote from '../screens/notes/UpdateNote';
import Settings from '../screens/settings/Settings';
import Categories from '../screens/categories/Categories';

import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomRootStackNavigator =
  createBottomTabNavigator<BottomRootStackNavigatorParams>();

export const BottomRootStack = () => {
  return (
    <BottomRootStackNavigator.Navigator
      initialRouteName="MainStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}) => {
          let iconName = '';

          if (route.name === 'MainStack') {
            iconName = focused ? 'md-reader' : 'md-reader-outline';
          } else if (route.name === 'SettingsStack') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'CategoryStack') {
            iconName = focused ? 'md-list' : 'md-list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8A2BE2',
        tabBarActiveBackgroundColor: '#1f1f1f',
        tabBarInactiveBackgroundColor: '#1f1f1f',
      })}>
      <BottomRootStackNavigator.Screen
        name="MainStack"
        component={MainScreenStack}
        options={{headerShown: false}}
      />
      <BottomRootStackNavigator.Screen
        name="CategoryStack"
        component={CategoryScreenStack}
        options={{headerShown: false}}
      />
      <BottomRootStackNavigator.Screen
        name="SettingsStack"
        component={SettingsScreenStack}
        options={{headerShown: false}}
      />
    </BottomRootStackNavigator.Navigator>
  );
};

const CategoryNavigatorStack =
  createStackNavigator<CategoryNavigatorStackParams>();

export const CategoryScreenStack = () => {
  return (
    <CategoryNavigatorStack.Navigator>
      <CategoryNavigatorStack.Screen name="Categories" component={Categories} />
    </CategoryNavigatorStack.Navigator>
  );
};

const SettingsNavigatorStack =
  createStackNavigator<SettingsNavigatorStackParams>();

export const SettingsScreenStack = () => {
  return (
    <SettingsNavigatorStack.Navigator>
      <SettingsNavigatorStack.Screen name="Settings" component={Settings} />
    </SettingsNavigatorStack.Navigator>
  );
};

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
