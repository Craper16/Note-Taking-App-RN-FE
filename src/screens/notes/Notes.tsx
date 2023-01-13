import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Button, ActivityIndicator} from 'react-native-paper';
import {defaultState} from '../../redux/auth/authSlice';
import {useFetchNotesQuery} from '../../redux/api/notesApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {resetKeychainData} from '../../storage/keychain';
import {FlashList} from '@shopify/flash-list';
import {defaultNotes, noteData, setNotes} from '../../redux/auth/notesSlice';
import Note from '../../components/notes/Note';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParams} from '../../navigation/MainNavigation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

type props = StackScreenProps<MainStackParams, 'Notes'>;

const Notes = ({navigation}: props) => {
  const dispatch = useAppDispatch();
  const {username} = useAppSelector(state => state.auth);
  const {notesData, isEnd, filteredData} = useAppSelector(state => state.notes);
  const [page, setPage] = useState(1);
  const {isError, error, data, isFetching, isSuccess} =
    useFetchNotesQuery(page);

  useEffect(() => {
    if (data?.notes) {
      dispatch(setNotes({data: data?.notes}));
    }
  }, [data, dispatch]);

  const handleLogout = () => {
    resetKeychainData();
    dispatch(defaultState());
    dispatch(defaultNotes());
  };

  const handleLoadMore = useCallback(() => {
    if (!isEnd && !isFetching) {
      console.log('isRunning');
      return setPage(page + 1);
    } else {
      return;
    }
  }, [isEnd, isFetching]);

  const renderErrorComponent = () => (
    <View>
      <Text>{(error as any).data?.message || (error as any).error}</Text>
    </View>
  );

  const renderFooterComponent = () =>
    isFetching && !isEnd ? (
      <ActivityIndicator animating={true} />
    ) : (
      <View>
        <Text>No more notes to fetch</Text>
      </View>
    );

  const renderListEmptyComponent = () =>
    !isFetching && isSuccess ? (
      <View>
        <Text>No notes found, try adding some</Text>
      </View>
    ) : null;

  const renderNote = ({item}: {item: noteData}) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Note', {noteId: item._id})}>
      <Note
        key={item._id}
        content={item.content}
        title={item.title}
        tags={item.tags}
        createdAt={item.createdAt}
        updatedAt={item.updatedAt}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.screen}>
      <Text style={{textAlign: 'center'}}>Welcome {username}</Text>
      <FlashList
        data={notesData}
        keyExtractor={item => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={
          isError ? renderErrorComponent : renderFooterComponent
        }
        ListEmptyComponent={renderListEmptyComponent}
        estimatedItemSize={200}
        renderItem={renderNote}
      />
      <Button style={styles.actions} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'f1f1f1',
  },
  actions: {
    marginBottom: 20,
  },
});

export default Notes;
