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
        titleNumberOfLines={3}
      />
      <Divider bold />
      <Paragraph>Category: {category}</Paragraph>
      <Divider bold />
      <Text>
        Created at: {createdAt.toString().split('T')[0]}
        {' , '}
        {createdAt.toString().split('T')[1].split('.')[0]}
      </Text>
      <Text>
        Updated at: {updatedAt.toString().split('T')[0]}
        {' , '}
        {updatedAt.toString().split('T')[1].split('.')[0]}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aab1eebb',
    margin: 15,
    padding: 30,
    flex: 1,
    width: '93%',
  },
  title: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Note;
