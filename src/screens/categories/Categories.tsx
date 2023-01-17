import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../config/colors/colors';

const Categories = () => {
  return (
    <View style={styles.screen}>
      <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
});

export default Categories;
