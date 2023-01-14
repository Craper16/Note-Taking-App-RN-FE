import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

import {Button, Card} from 'react-native-paper';

type props = {
  title: string;
  content: string;
  tags: string[];
  category: string;
  updatedAt: Date;
  createdAt: Date;
  handleUpdate(): void;
};

const NoteDetails = ({
  content,
  createdAt,
  tags,
  title,
  updatedAt,
  category,
  handleUpdate,
}: props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <ScrollView>
        <Text style={styles.textStyle}>{content}</Text>
        <Text style={styles.textStyle}>{category}</Text>
        <Text style={styles.textStyle}>
          Created at: {createdAt.toString().split('T')[0]}
        </Text>
        <Text style={styles.textStyle}>
          Updated at: {updatedAt.toString().split('T')[0]}
        </Text>
        <Card style={styles.tagsContainer}>
          {tags.map((tag, i) => {
            return (
              <Text key={i} style={styles.textStyle}>
                {tag}
              </Text>
            );
          })}
        </Card>
        <Button mode="contained" onPress={handleUpdate}>
          Update Note
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 34,
    margin: 30,
  },
  textStyle: {
    color: 'white',
    margin: 20,
    fontSize: 18,
  },
  tagsContainer: {
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoteDetails;
