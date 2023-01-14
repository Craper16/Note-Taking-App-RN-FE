import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Paragraph, Divider} from 'react-native-paper';

type props = {
  title: string;
  category: string;
  updatedAt: Date;
  createdAt: Date;
};

const Note = ({createdAt, title, category, updatedAt}: props) => {
  return (
    <Card mode="elevated" style={styles.container}>
      <Card.Title
        title={title}
        titleVariant="headlineMedium"
        titleNumberOfLines={2}
      />
      <Divider bold />
      <Paragraph>{category}</Paragraph>
      <Divider bold />
      <Text>Created at: {createdAt.toString().split('T')[0]}</Text>
      <Text>Updated at: {updatedAt.toString().split('T')[0]}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aab1eebb',
    padding: 30,
    margin: 30,
    flex: 1,
    width: '90%',
  },
  title: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Note;
