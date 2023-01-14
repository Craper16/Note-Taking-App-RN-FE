import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {
  useDeleteNoteMutation,
  useFetchNoteQuery,
} from '../../redux/api/notesApi';
import {StackScreenProps} from '@react-navigation/stack';
import NoteDetails from '../../components/notes/NoteDetails';
import {ActivityIndicator, Button, IconButton} from 'react-native-paper';

import type {MainStackParams} from '../../types/navigationTypes';
import {useAppDispatch} from '../../redux/hooks';
import {removeNote} from '../../redux/notes/notesSlice';

type props = StackScreenProps<MainStackParams, 'Note'>;

const Note = ({route, navigation}: props) => {
  const {noteId} = route.params;

  const dispatch = useAppDispatch();

  const {isError, isFetching, data, error, refetch} = useFetchNoteQuery(noteId);

  const [deleteNote, {isLoading, isSuccess}] = useDeleteNoteMutation();

  useEffect(() => {
    if (data?.note?.title || data?.note?.content || data?.note?.tags) {
      refetch();
    }
  }, [data?.note?.title, data?.note?.content, data?.note?.tags, refetch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeNote({noteId: noteId}));
      navigation.navigate('Notes');
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>{(error as any).data.message || (error as any).error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {isFetching ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View>
          <Button
            icon="delete"
            style={styles.deleteIcon}
            onPress={() => deleteNote(noteId)}>
            Delete note
          </Button>
          <NoteDetails
            category={data.note.category}
            content={data.note.content}
            createdAt={data.note.createdAt}
            tags={data.note.tags}
            title={data.note.title}
            updatedAt={data.note.updatedAt}
            handleUpdate={() =>
              navigation.navigate('UpdateNote', {
                noteId: noteId,
                content: data?.note.content,
                tags: data?.note.tags,
                title: data?.note.title,
              })
            }
          />
        </View>
      )}
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: '',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  deleteIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default Note;
