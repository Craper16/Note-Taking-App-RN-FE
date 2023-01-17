import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useFetchNotesQuery} from '../../redux/api/notesApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FlashList} from '@shopify/flash-list';
import {defaultNotes, setNotes} from '../../redux/notes/notesSlice';
import Note from '../../components/notes/Note';
import {noteData} from '../../interfaces/noteInterface';
import {StackScreenProps} from '@react-navigation/stack';

import type {MainStackParams} from '../../types/navigationTypes';
import {Colors} from '../../config/colors/colors';

type props = StackScreenProps<MainStackParams, 'Notes'>;

const Notes = ({navigation}: props) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {notesData, isEnd} = useAppSelector(state => state.notes);

  const {isError, error, data, isFetching, isSuccess} =
    useFetchNotesQuery(page);

  useEffect(() => {
    if (data?.notes) {
      dispatch(setNotes({data: data?.notes}));
    }
  }, [data, dispatch]);

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
    (isFetching || !isEnd) && !isError ? (
      <ActivityIndicator animating={true} />
    ) : null;

  const renderListEmptyComponent = () =>
    !isFetching && isSuccess ? (
      <View>
        <Text style={styles.emptyList}>No notes found, try adding some</Text>
      </View>
    ) : null;

  const renderNote = ({item}: {item: noteData}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Note', {noteId: item._id})}>
      <Note
        key={item._id}
        category={item.category.title}
        title={item.title}
        createdAt={item.createdAt}
        updatedAt={item.updatedAt}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {isError && (
        <View>
          <Text style={styles.errorApiResponseText}>
            {(error as any).data?.message || (error as any).error}
          </Text>
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
    </View>
  );
};

export const screenOptions = ({navigation}: props) => {
  return {
    headerRight: () => (
      <IconButton
        icon="plus"
        iconColor={Colors.secondary}
        onPress={() => navigation.navigate('AddNote')}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  emptyList: {
    color: Colors.secondary,
    margin: 40,
    textAlign: 'center',
  },
  actions: {
    marginBottom: 20,
  },
  errorApiResponseText: {
    textAlign: 'center',
    color: 'tomato',
    margin: 7,
  },
});

export default Notes;
