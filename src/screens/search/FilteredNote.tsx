import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {
  useDeleteNoteMutation,
  useFetchNoteQuery,
} from '../../redux/api/notesApi';
import NoteDetails from '../../components/notes/NoteDetails';
import {ActivityIndicator, Button} from 'react-native-paper';

import {useAppDispatch} from '../../redux/hooks';
import {removeNote} from '../../redux/notes/notesSlice';
import {Colors} from '../../config/colors/colors';
import {StackScreenProps} from '@react-navigation/stack';
import {SearchNavigatorStackParams} from '../../types/navigationTypes';

type props = StackScreenProps<SearchNavigatorStackParams, 'filteredNote'>;

const FilteredNote = ({route, navigation}: props) => {
  const dispatch = useAppDispatch();

  const {noteId} = route.params;

  const {isError, isFetching, data, error} = useFetchNoteQuery(noteId);

  const [deleteNote, {isLoading, isSuccess}] = useDeleteNoteMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeNote({noteId: noteId}));
      navigation.navigate('Search');
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator animating={true} style={styles.loadingIndicator} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.screen}>
        <Text style={styles.errorApiResponseText}>
          {(error as any).data.message || (error as any).error}
        </Text>
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
            icon="delete-circle"
            style={styles.deleteIcon}
            textColor="tomato"
            onPress={() =>
              Alert.alert(
                'Warning!',
                'Are you sure you want to delete this note?',
                [
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteNote(noteId),
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
              )
            }>
            Delete Note
          </Button>
          <ScrollView>
            <NoteDetails
              category={data.note.category.title}
              content={data.note.content}
              createdAt={data.note.createdAt}
              tags={data.note.tags}
              title={data.note.title}
              updatedAt={data.note.updatedAt}
              handleUpdate={() =>
                navigation.navigate('UpdateFilteredNote', {
                  noteId: noteId,
                  content: data?.note.content,
                  tags: data?.note.tags,
                  title: data?.note.title,
                })
              }
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  deleteIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loadingIndicator: {
    textAlign: 'center',
    margin: 20,
    justifyContent: 'center',
  },
  errorApiResponseText: {
    textAlign: 'center',
    color: 'tomato',
    margin: 7,
  },
});

export default FilteredNote;
