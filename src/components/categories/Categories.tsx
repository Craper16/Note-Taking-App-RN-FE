import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';

interface props {
  title: string;
}

export const Categories = ({title}: props) => {
  return (
    <Card mode="elevated" style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aab1eebb',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    margin: 6,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
