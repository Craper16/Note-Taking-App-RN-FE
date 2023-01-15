import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';

import {Button} from 'react-native-paper';

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
      <Button icon="update" mode="contained" onPress={handleUpdate}>
        Update Note
      </Button>
      <Text style={styles.titleStyle}>{title}</Text>
      <View style={styles.scrollContainer}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.descriptionStyle}>{content}</Text>
        <Text style={styles.categoryText}>Category: {category}</Text>
        <Text style={styles.textStyle}>
          Created at: {createdAt.toString().split('T')[0]}
          {' , '}
          {createdAt.toString().split('T')[1].split('.')[0]}
        </Text>
        <Text style={styles.textStyle}>
          Updated at: {updatedAt.toString().split('T')[0]}
          {' , '}
          {updatedAt.toString().split('T')[1].split('.')[0]}
        </Text>
        <Button onPress={handleShowingTags}>Tags</Button>
        {showTags && (
          <View style={styles.tagsContainer}>
            {tags.map((tag, i) => (
              <View>
                <Text key={i} style={styles.textStyle}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    marginBottom: 60,
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 34,
    margin: 30,
  },
  descriptionTitle: {
    color: 'white',
    fontSize: 22,
    margin: 6,
  },
  descriptionStyle: {
    color: 'white',
    margin: 10,
    padding: 5,
    fontSize: 18,
  },
  categoryText: {
    color: 'white',
    fontSize: 22,
    margin: 6,
    padding: 2,
  },
  textStyle: {
    color: 'white',
    margin: 6,
    padding: 2,
    fontSize: 14,
  },
  tagsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteDetails;
