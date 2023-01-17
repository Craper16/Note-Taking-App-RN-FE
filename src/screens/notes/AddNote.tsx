import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {useCreateNoteMutation} from '../../redux/api/notesApi';
import {Formik} from 'formik';
import {addNoteValidationSchema} from '../../validations/notes/noteValidation';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setNote} from '../../redux/notes/notesSlice';
import {formValues} from '../../interfaces/noteInterface';

import type {MainStackParams} from '../../types/navigationTypes';
import DropDown from 'react-native-paper-dropdown';
import {Colors} from '../../config/colors/colors';
import {useFetchCategoriesQuery} from '../../redux/api/categoriesApi';
import {
  categoryData,
  dropDownCategoriesModel,
} from '../../interfaces/categoryInterface';
import {setDropDownCategories} from '../../redux/categories/categoriesSlice';

type props = StackScreenProps<MainStackParams, 'AddNote'>;

const AddNote = ({navigation}: props) => {
  const dispatch = useAppDispatch();
  const {dropDownCategories} = useAppSelector(state => state.categories);

  const [showDropDown, setShowDropDown] = useState(false);

  const [createNote, {isError, isLoading, isSuccess, error, data}] =
    useCreateNoteMutation();

  const categoriesData = useFetchCategoriesQuery().data;
  const categoriesSuccess = useFetchCategoriesQuery().isSuccess;

  const categoryTitles: dropDownCategoriesModel[] = [];

  useEffect(() => {
    if (categoriesSuccess) {
      categoriesData!.categories.map((category: categoryData) =>
        categoryTitles.push({label: category.title, value: category.title}),
      );
      dispatch(setDropDownCategories({data: categoryTitles}));
    }
  }, [categoriesSuccess, categoriesData, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setNote({data: data?.note}));
      navigation.goBack();
    }
  }, [isSuccess, dispatch, navigation]);

  const initialValues: formValues = {
    categoryTitle: '',
    content: '',
    tag: '',
    tags: [],
    title: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      onSubmit={values => createNote({...values})}
      validationSchema={addNoteValidationSchema}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        errors,
        values,
        touched,
      }) => (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.screen}
          keyboardVerticalOffset={50}>
          <ScrollView style={styles.scrollContainer}>
            <View>
              <TextInput
                style={styles.textInputStyle}
                mode="flat"
                label="Title"
                value={values.title}
                onChangeText={handleChange('title')}
                error={!!errors.title && touched.title}
                onBlur={handleBlur('title')}
              />
              {errors.title && touched.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
              <TextInput
                mode="flat"
                label="Description"
                style={styles.textInputStyle}
                value={values.content}
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
                error={!!errors.content && touched.content}
              />
              {errors.content && touched.content && (
                <Text style={styles.errorText}>{errors.content}</Text>
              )}
              <View>
                <View>
                  <View>
                    <TextInput
                      mode="flat"
                      label="Tag"
                      style={styles.textInputStyle}
                      value={values.tag}
                      onChangeText={handleChange('tag')}
                      error={!!errors.tag && touched.tag}
                    />
                    <Button
                      onPress={async () => {
                        await values.tags.push(values.tag);
                        values.tag = initialValues.tag;
                      }}>
                      Add Tag
                    </Button>
                  </View>
                  {errors.tag && touched.tag && (
                    <Text style={styles.errorText}>{errors.tag}</Text>
                  )}
                  {errors.tags && (
                    <Text style={styles.errorText}>{errors.tags}</Text>
                  )}
                </View>
              </View>
              <View style={styles.textInputStyle}>
                <DropDown
                  label="Category"
                  mode="flat"
                  visible={showDropDown}
                  value={values.categoryTitle}
                  setValue={handleChange('categoryTitle')}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  list={dropDownCategories}
                  activeColor={Colors.secondary}
                />
                {errors.categoryTitle && touched.categoryTitle && (
                  <Text style={styles.errorText}>{errors.categoryTitle}</Text>
                )}
              </View>
              <Button
                onPress={handleSubmit}
                disabled={!isValid && isLoading}
                loading={isLoading}>
                Add Note
              </Button>
              {isError && (
                <View>
                  <Text style={styles.errorApiResponseText}>
                    {(error as any).data.message || (error as any).error}
                  </Text>
                </View>
              )}
            </View>
            {values.tags.map((tag, i) => (
              <Button
                key={i}
                icon="delete"
                style={{flexDirection: 'row'}}
                onPress={() => {
                  values.tags = [
                    ...values.tags.filter(filteredTag => filteredTag !== tag),
                  ];
                }}>
                {tag}
              </Button>
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Add note',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  textInputStyle: {
    margin: 20,
  },
  scrollContainer: {
    marginBottom: 80,
  },
  errorApiResponseText: {
    textAlign: 'center',
    color: 'tomato',
    margin: 7,
  },
  errorText: {
    textAlign: 'center',
    color: 'tomato',
  },
});

export default AddNote;
