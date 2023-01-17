import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';

import {useFetchCategoriesQuery} from '../../redux/api/categoriesApi';
import {Colors} from '../../config/colors/colors';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setCategories} from '../../redux/categories/categoriesSlice';
import {FlashList} from '@shopify/flash-list';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {CategoryNavigatorStackParams} from '../../types/navigationTypes';
import {categoryData} from '../../interfaces/categoryInterface';
import {Categories as CategoryItem} from '../../components/categories/Categories';

type props = StackScreenProps<CategoryNavigatorStackParams, 'Categories'>;

const Categories = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const {categories} = useAppSelector(state => state.categories);

  const {data, isError, error, isFetching, isSuccess} =
    useFetchCategoriesQuery();

  useEffect(() => {
    if (data?.categories) {
      dispatch(setCategories({data: data.categories}));
    }
  }, [data, dispatch]);

  const renderFooterComponent = () =>
    isFetching && !isError ? <ActivityIndicator animating={true} /> : null;

  const renderListEmptyComponent = () =>
    !isFetching && isSuccess ? (
      <View>
        <Text style={styles.emptyList}>
          No categories found, try adding some
        </Text>
      </View>
    ) : null;

  const renderCategoryItem = ({item}: {item: categoryData}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('CategoryDetails', {
          categoryId: item._id,
          categoryTitle: item.title,
        })
      }>
      <CategoryItem title={item.title} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <FlashList
        data={categories}
        keyExtractor={item => item._id}
        estimatedItemSize={200}
        ListFooterComponent={renderFooterComponent}
        ListEmptyComponent={renderListEmptyComponent}
        renderItem={renderCategoryItem}
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
        onPress={() => navigation.navigate('AddCategory')}
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
});

export default Categories;
