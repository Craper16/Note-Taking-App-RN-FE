import {View, Text} from 'react-native';
import React from 'react';

type props = {
  title: string;
  content: string;
  tags: string[];
  category: string;
  updatedAt: Date;
  createdAt: Date;
};

const NoteDetails = ({content, createdAt, tags, title, updatedAt, category}: props) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <Text>{category}</Text>
      <Text>{createdAt.toString().split('T')[0]}</Text>
      <Text>{updatedAt.toString().split('T')[0]}</Text>
      {tags.map((tag, i) => {
        return <Text key={i}>{tag}</Text>
      })}
    </View>
  );
};

export default NoteDetails;
