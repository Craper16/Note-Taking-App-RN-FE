import {View, Text} from 'react-native';
import React from 'react';
import {useFetchNoteQuery} from '../../redux/api/notesApi';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParams} from '../../navigation/MainNavigation';
import NoteDetails from '../../components/notes/NoteDetails';
import {ActivityIndicator} from 'react-native-paper';

type props = StackScreenProps<MainStackParams, 'Note'>;

const Note = ({route, navigation}: props) => {
  const {noteId} = route.params;
  const {isError, isFetching, data, error} = useFetchNoteQuery(noteId);

  console.log(error);

  if (isError) {
    return (
      <View>
        <Text>{(error as any).data.message || (error as any).error}</Text>
      </View>
    );
  }

  return (
    <View>
      {isFetching ? (
        <ActivityIndicator animating={true} />
      ) : (
        <NoteDetails
          category={data.note.category}
          content={data.note.content}
          createdAt={data.note.createdAt}
          tags={data.note.tags}
          title={data.note.title}
          updatedAt={data.note.updatedAt}
        />
      )}
    </View>
  );
};

export default Note;
