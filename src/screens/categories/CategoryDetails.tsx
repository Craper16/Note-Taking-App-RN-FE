import {View, Text} from 'react-native';
import React from 'react';
import {CategoryNavigatorStackParams} from '../../types/navigationTypes';
import {StackScreenProps} from '@react-navigation/stack';

type props = StackScreenProps<CategoryNavigatorStackParams, 'CategoryDetails'>;

const CategoryDetails = ({navigation, route}: props) => {
  const {categoryId} = route.params;

  return (
    <View>
      <Text>{categoryId}</Text>
    </View>
  );
};

export const screenOptions = ({route}: props) => {
  return {
    headerTitle: route.params.categoryTitle,
  };
};

export default CategoryDetails;
