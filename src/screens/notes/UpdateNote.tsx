import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';

import {TextInput, Button} from 'react-native-paper';

import {Formik} from 'formik';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainStackParams} from '../../types/navigationTypes';
import {updateNoteValidations} from '../../validations/notes/noteValidation';
import {useUpdateNoteMutation} from '../../redux/api/notesApi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {updateNote as updateNoteData} from '../../redux/notes/notesSlice';

type props = StackScreenProps<MainStackParams, 'UpdateNote'>;

const updateNote = ({navigation, route}: props) => {
  const dispatch = useAppDispatch();
  const {notesData} = useAppSelector(state => state.notes);

  const {noteId, content, tags, title} = route.params;

  const [updateNote, {isError, isLoading, isSuccess, error, data}] =
    useUpdateNoteMutation();

  // console.log(data);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateNoteData({
          noteId,
          tags: data?.note.tags,
          content: data?.note.content,
          title: data?.note.title,
        }),
      );
      navigation.pop(2);
    }
  }, [isSuccess]);

  return (
    <Formik
      initialValues={{content: content, tags: [...tags], title: title, tag: ''}}
      validateOnMount={true}
      onSubmit={values =>
        updateNote({
          noteId: noteId,
          body: {
            tags: values.tags,
            content: values.content,
            title: values.title,
          },
        })
      }
      validationSchema={updateNoteValidations}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        errors,
        values,
        touched,
      }) => (
        <ScrollView>
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
              onChangeText={handleChange('content')}
              error={!!errors.content && touched.content}
            />
            {errors.content && touched.content && <Text>{errors.content}</Text>}
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
                  <Button onPress={() => values.tags.push(values.tag)}>
                    Add Tag
                  </Button>
                </View>
                {errors.tag && touched.tag && <Text>{errors.tag}</Text>}
                {errors.tags && <Text>{errors.tags}</Text>}
              </View>
            </View>
            <Button
              onPress={handleSubmit}
              disabled={!isValid && isLoading}
              loading={isLoading}>
              Update Note
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
                values.tags.filter((filteredTag, index) => {
                  if (filteredTag === tag) {
                    values.tags.splice(index, 1);
                    return true;
                  }
                  return false;
                });
              }}>
              {tag}
            </Button>
          ))}
        </ScrollView>
      )}
    </Formik>
  );
};

export default updateNote;
