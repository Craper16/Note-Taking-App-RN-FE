import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Button, ActivityIndicator, IconButton} from 'react-native-paper';
import {defaultState} from '../../redux/auth/authSlice';
import {useFetchNotesQuery} from '../../redux/api/notesApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {resetKeychainData} from '../../storage/keychain';
import {FlashList} from '@shopify/flash-list';
import {defaultNotes, setNotes} from '../../redux/notes/notesSlice';
import Note from '../../components/notes/Note';
import {noteData} from '../../interfaces/noteInterface';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import type {MainStackParams} from '../../types/navigationTypes';

type props = StackScreenProps<MainStackParams, 'Notes'>;

const Notes = ({navigation}: props) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {username} = useAppSelector(state => state.auth);

  const {notesData, isEnd} = useAppSelector(state => state.notes);

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (page !== 1) {
      dispatch(defaultNotes());
      setPage(1);
    }
    setIsRefreshing(false);
  };

  const handleLoadMore = useCallback(() => {
    if (!isEnd && !isFetching) {
      return setPage(page + 1);
    } else {
      return;
    }
  }, [isEnd, isFetching]);

  const renderFooterComponent = () =>
    isFetching || !isEnd ? <ActivityIndicator animating={true} /> : null;

  const renderListEmptyComponent = () =>
    !isFetching && isSuccess ? (
      <View>
        <Text style={{color: 'white'}}>No notes found, try adding some</Text>
      </View>
    ) : null;

  const renderNote = ({item}: {item: noteData}) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Note', {noteId: item._id})}>
      <Note
        key={item._id}
        category={item.category.title}
        title={item.title}
        createdAt={item.createdAt}
        updatedAt={item.updatedAt}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.screen}>
      <Text style={{textAlign: 'center', color: '#8A2BE2', marginTop: 20}}>
        Welcome {username}
      </Text>
      {isError && (
        <View>
          <Text>{(error as any).data?.message || (error as any).error}</Text>
        </View>
      )}
      <FlashList
        data={notesData}
        keyExtractor={item => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} />
        }
        ListFooterComponent={renderFooterComponent}
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

export const screenOptions = ({navigation}: props) => {
  return {
    headerRight: () => (
      <IconButton
        icon="plus"
        iconColor="#8A2BE2"
        onPress={() => navigation.navigate('AddNote')}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  actions: {
    marginBottom: 20,
  },
});

export default Notes;
