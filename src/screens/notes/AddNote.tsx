import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useCreateNoteMutation} from '../../redux/api/notesApi';
import {Formik} from 'formik';
import {addNoteValidationSchema} from '../../validations/notes/noteValidation';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch} from '../../redux/hooks';
import {setNote} from '../../redux/notes/notesSlice';
import {formValues} from '../../interfaces/noteInterface';

import type {MainStackParams} from '../../types/navigationTypes';

type props = StackScreenProps<MainStackParams, 'AddNote'>;

const AddNote = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const [createNote, {isError, isLoading, isSuccess, error, data}] =
    useCreateNoteMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setNote({data: data?.note}));
      navigation.goBack();
    }
  }, [isSuccess]);

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
                mode="outlined"
                label="Title"
                value={values.title}
                onChangeText={handleChange('title')}
                error={!!errors.title && touched.title}
                onBlur={handleBlur('title')}
              />
              {errors.title && touched.title && <Text>{errors.title}</Text>}
              <TextInput
                mode="outlined"
                label="Description"
                value={values.content}
                multiline={true}
                numberOfLines={5}
                onChangeText={handleChange('content')}
                error={!!errors.content && touched.content}
              />
              {errors.content && touched.content && (
                <Text>{errors.content}</Text>
              )}
              <View>
                <View>
                  <View>
                    <TextInput
                      mode="outlined"
                      label="Tag"
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
                  {errors.tag && touched.tag && <Text>{errors.tag}</Text>}
                  {errors.tags && <Text>{errors.tags}</Text>}
                </View>
              </View>
              <TextInput
                mode="outlined"
                label="Category"
                autoCapitalize="none"
                value={values.categoryTitle}
                onChangeText={handleChange('categoryTitle')}
                error={!!errors.categoryTitle && touched.categoryTitle}
              />
              {errors.categoryTitle && touched.categoryTitle && (
                <Text>{errors.categoryTitle}</Text>
              )}
              <Button
                onPress={handleSubmit}
                disabled={!isValid && isLoading}
                loading={isLoading}>
                Add Note
              </Button>
              {isError && (
                <View>
                  <Text>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  scrollContainer: {
    marginBottom: 80,
  },
});

export default AddNote;
