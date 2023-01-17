import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';

import {useSearchByTagQuery} from '../../redux/api/notesApi';

import {Colors} from '../../config/colors/colors';
import {Searchbar} from 'react-native-paper';
import {searchedByTag} from '../../redux/notes/notesSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import Note from '../../components/notes/Note';

import {noteData} from '../../interfaces/noteInterface';
import {StackScreenProps} from '@react-navigation/stack';
import {SearchNavigatorStackParams} from '../../types/navigationTypes';

type props = StackScreenProps<SearchNavigatorStackParams, 'Search'>;

const Search = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const {filteredData} = useAppSelector(state => state.notes);

  const [searchTag, setSearchTag] = useState('');

  const {isFetching, isError, data, error, isSuccess} =
    useSearchByTagQuery(searchTag);

  useEffect(() => {
    if (data?.notes) {
      dispatch(searchedByTag({data: data?.notes}));
    }
  }, [data, dispatch]);

  const renderListEmptyComponent = () =>
    !isFetching && isSuccess && searchTag ? (
      <View>
        <Text style={styles.emptyList}>No notes with searched tag found</Text>
      </View>
    ) : (
      <View>
        <Text style={styles.emptyList}>Search notes by tag</Text>
      </View>
    );

  const renderNote = ({item}: {item: noteData}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        return (
          setSearchTag(''),
          navigation.navigate('filteredNote', {noteId: item._id})
        );
      }}>
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
      <View style={styles.searchStyleContainer}>
        <Searchbar
          style={styles.searchStyle}
          value={searchTag}
          autoCapitalize="none"
          loading={!isSuccess ? false : isFetching}
          iconColor={Colors.secondary}
          onChangeText={text => setSearchTag(text)}
        />
      </View>
      {isError && (
        <View>
          <Text style={styles.errorApiResponseText}>
            {(error as any).data?.message || (error as any).error}
          </Text>
        </View>
      )}
      <FlashList
        data={filteredData}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          isError || isFetching ? null : renderListEmptyComponent
        }
        estimatedItemSize={200}
        renderItem={renderNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  searchStyleContainer: {
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyList: {
    color: Colors.secondary,
    margin: 40,
    textAlign: 'center',
  },
  searchStyle: {
    height: 40,
    width: 300,
  },
  errorApiResponseText: {
    textAlign: 'center',
    color: 'tomato',
    margin: 7,
  },
});

export default Search;
