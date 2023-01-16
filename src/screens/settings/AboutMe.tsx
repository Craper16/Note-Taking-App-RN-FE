import {View, Text, StyleSheet, Linking, Alert} from 'react-native';
import React, {useCallback} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingsNavigatorStackParams} from '../../types/navigationTypes';
import {Button} from 'react-native-paper';
import { Colors } from '../../config/colors/colors';

type props = StackScreenProps<SettingsNavigatorStackParams, 'AboutMe'>;

const GITHUB_URL = 'https://github.com/Craper16';
const INSTAGRAM_URL = 'https://www.instagram.com/grgiosaad/';
const DIRECT_EMAIL = 'mailto:georgio.saad@gmail.com';

const AboutMe = ({route}: props) => {
  const {username} = route.params;

  const handleLinkPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Cannot open ${url}`);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>
          {`Hello there ${username}, glad you've decided to know more about me!`}
        </Text>
      </View>
      <View style={styles.contentTextContainer}>
        <Text style={styles.contentText}>
          I'm a 21 year old software engineer, that started learning react and
          react native around 1 to 2 months ago, and this is my first basic,
          small individual project, i've built it's backend using nodeJS +
          express and the frontend using react native + Typescript, obviously.
        </Text>
        <View style={styles.contentTextContainer}>
          <Text style={styles.contentText}>How to reach me?</Text>
          <View style={styles.actionsContainer}>
            <Button onPress={() => handleLinkPress(GITHUB_URL)}>
              My Github
            </Button>
            <Button onPress={() => handleLinkPress(INSTAGRAM_URL)}>
              My Instagram
            </Button>
            <Button onPress={() => handleLinkPress(DIRECT_EMAIL)}>
              My email
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  mainTextContainer: {
    margin: 18,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  mainText: {
    color: Colors.text,
    textAlign: 'auto',
    fontSize: 24,
  },
  contentTextContainer: {
    margin: 18,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  contentText: {
    color: Colors.text,
    textAlign: 'center',
    fontSize: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  }
});

export default AboutMe;
