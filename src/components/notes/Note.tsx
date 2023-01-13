import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';

type props = {
  title: string;
  content: string;
  tags: string[];
  updatedAt: Date;
  createdAt: Date;
};

const Note = ({content, createdAt, tags, title, updatedAt}: props) => {
  return (
    <Card mode="elevated" style={styles.container}>
      <Card.Title title={title} titleVariant="headlineMedium" />
      <Divider bold />
      <Paragraph>{content}</Paragraph>
      <Text>Tags:</Text>
      {tags.map((tag, i) => (
        <Text key={i}>{tag}</Text>
      ))}
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
