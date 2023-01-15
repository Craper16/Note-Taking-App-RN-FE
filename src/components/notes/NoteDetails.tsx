import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';

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
  const [showTags, setShowTags] = useState(false);

  const handleShowingTags = () => setShowTags(!showTags);

  return (
    <View style={styles.container}>
      <View>
        <Button icon='update' mode="contained" onPress={handleUpdate}>
          Update Note
        </Button>
        <Text style={styles.titleStyle}>{title}</Text>
        <ScrollView>
          <Text style={styles.textStyle}>Description:</Text>
          <Text style={styles.textStyle}>{content}</Text>
          <Text style={styles.textStyle}>Category: {category}</Text>
          <Text style={styles.textStyle}>
            Created at: {createdAt.toString().split('T')[0]}
          </Text>
          <Text style={styles.textStyle}>
            Updated at: {updatedAt.toString().split('T')[0]}
          </Text>
          <Button onPress={handleShowingTags}>Tags</Button>
          {showTags && (
            <Card style={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <Text key={i} style={styles.textStyle}>
                  {tag}
                </Text>
              ))}
            </Card>
          )}
        </ScrollView>
      </View>
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
