import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorStackParams} from '../../types/navigationTypes';

import {defaultState} from '../../redux/auth/authSlice';
import {defaultNotes} from '../../redux/notes/notesSlice';
import {resetKeychainData} from '../../storage/keychain';
import {useAppDispatch} from '../../redux/hooks';

import {useAppSelector} from '../../redux/hooks';

type props = StackScreenProps<SettingsNavigatorStackParams, 'Settings'>;

const Settings = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const {username} = useAppSelector(state => state.auth);

  const handleLogout = () => {
    resetKeychainData();
    dispatch(defaultState());
    dispatch(defaultNotes());
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.userTextContainer}>
        <Text style={styles.userText}>{username}</Text>
      </View>
      <View style={styles.settingsElementContainer}>
        <Button
          style={styles.settingsElement}
          icon="information"
          mode="contained"
          onPress={() => navigation.navigate('AboutMe', {username: username!})}>
          About me
        </Button>
        <Button
          style={styles.settingsElement}
          icon="theme-light-dark"
          mode="contained">
          Theme
        </Button>
        <Button
          mode="contained"
          icon="logout"
          style={styles.settingsElement}
          onPress={() => {
            Alert.alert(
              'You are logging out',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Logout',
                  style: 'destructive',
                  onPress: handleLogout,
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
            );
          }}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  userTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  userText: {
    color: '#8A2BE2',
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsElementContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  settingsElement: {
    color: '#8A2BE2',
    margin: 15,
  },
});

export default Settings;
