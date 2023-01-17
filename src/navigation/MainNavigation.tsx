import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {
  AuthStackParams,
  BottomRootStackNavigatorParams,
  MainStackParams,
  SettingsNavigatorStackParams,
  CategoryNavigatorStackParams,
  SearchNavigatorStackParams,
} from '../types/navigationTypes';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Notes, {
  screenOptions as notesScreenOptions,
} from '../screens/notes/Notes';
import Note, {screenOptions as noteScreenOptions} from '../screens/notes/Note';
import AddNote, {
  screenOptions as addNoteScreenOptions,
} from '../screens/notes/AddNote';
import UpdateNote from '../screens/notes/UpdateNote';
import Settings from '../screens/settings/Settings';
import Categories, {
  screenOptions as categoriesScreenOptions,
} from '../screens/categories/Categories';
import AboutMe from '../screens/settings/AboutMe';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-paper';
import Search from '../screens/search/Search';
import {Colors} from '../config/colors/colors';
import FilteredNote from '../screens/search/FilteredNote';
import UpdateFilteredNote from '../screens/search/UpdateFilteredNote';
import AddCategory from '../screens/categories/AddCategory';
import CategoryDetails, {
  screenOptions as categoryDetailsScreenOptions,
} from '../screens/categories/CategoryDetails';

const BottomRootStackNavigator =
  createBottomTabNavigator<BottomRootStackNavigatorParams>();

export const BottomRootStack = () => {
  return (
    <BottomRootStackNavigator.Navigator
      initialRouteName="MainStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}) => {
          let iconName = '';

          switch (route.name) {
            case 'MainStack':
              iconName = focused ? 'md-reader' : 'md-reader-outline';
              break;
            case 'CategoryStack':
              iconName = focused ? 'md-list' : 'md-list-outline';
              break;
            case 'SearchStack':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'SettingsStack':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({children, color}) => {
          switch (route.name) {
            case 'MainStack':
              children = 'Notes';
              break;
            case 'CategoryStack':
              children = 'Categories';
              break;
            case 'SearchStack':
              children = 'Search';
              break;
            case 'SettingsStack':
              children = 'Settings';
              break;
            default:
              children = '';
          }
          return <Text style={{color: color, fontSize: 11}}>{children}</Text>;
        },
        tabBarActiveTintColor: Colors.secondary,
        tabBarActiveBackgroundColor: Colors.main,
        tabBarInactiveBackgroundColor: Colors.main,
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
        name="SearchStack"
        component={SearchScreenStack}
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

const SearchNavigatorStack = createStackNavigator<SearchNavigatorStackParams>();

export const SearchScreenStack = () => {
  return (
    <SearchNavigatorStack.Navigator initialRouteName="Search">
      <SearchNavigatorStack.Screen name="Search" component={Search} />
      <SearchNavigatorStack.Screen
        name="filteredNote"
        component={FilteredNote}
      />
      <SearchNavigatorStack.Screen
        name="UpdateFilteredNote"
        component={UpdateFilteredNote}
      />
    </SearchNavigatorStack.Navigator>
  );
};

const CategoryNavigatorStack =
  createStackNavigator<CategoryNavigatorStackParams>();

export const CategoryScreenStack = () => {
  return (
    <CategoryNavigatorStack.Navigator initialRouteName="Categories">
      <CategoryNavigatorStack.Screen
        options={categoriesScreenOptions}
        name="Categories"
        component={Categories}
      />
      <CategoryNavigatorStack.Screen
        name="AddCategory"
        component={AddCategory}
      />
      <CategoryNavigatorStack.Screen
        options={categoryDetailsScreenOptions}
        name="CategoryDetails"
        component={CategoryDetails}
      />
    </CategoryNavigatorStack.Navigator>
  );
};

const SettingsNavigatorStack =
  createStackNavigator<SettingsNavigatorStackParams>();

export const SettingsScreenStack = () => {
  return (
    <SettingsNavigatorStack.Navigator initialRouteName="Settings">
      <SettingsNavigatorStack.Screen name="Settings" component={Settings} />
      <SettingsNavigatorStack.Screen name="AboutMe" component={AboutMe} />
    </SettingsNavigatorStack.Navigator>
  );
};

const MainNavigatorStack = createStackNavigator<MainStackParams>();

export const MainScreenStack = () => {
  return (
    <MainNavigatorStack.Navigator
      initialRouteName="Notes"
      screenOptions={{headerTintColor: Colors.secondary}}>
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
      <MainNavigatorStack.Screen
        options={addNoteScreenOptions}
        name="AddNote"
        component={AddNote}
      />
      <MainNavigatorStack.Screen name="UpdateNote" component={UpdateNote} />
    </MainNavigatorStack.Navigator>
  );
};

const AuthNavigatorStack = createStackNavigator<AuthStackParams>();

export const AuthScreenStack = () => {
  return (
    <AuthNavigatorStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerTintColor: Colors.secondary}}>
      <AuthNavigatorStack.Screen name="Login" component={Login} />
      <AuthNavigatorStack.Screen name="Signup" component={Signup} />
    </AuthNavigatorStack.Navigator>
  );
};
