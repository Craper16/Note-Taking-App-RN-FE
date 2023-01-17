import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';

import {TextInput, Button} from 'react-native-paper';

import {Formik} from 'formik';

import {updateNoteValidations} from '../../validations/notes/noteValidation';
import {useUpdateNoteMutation} from '../../redux/api/notesApi';
import {useAppDispatch} from '../../redux/hooks';
import {updateNote as updateNoteData} from '../../redux/notes/notesSlice';
import {Colors} from '../../config/colors/colors';
import {StackScreenProps} from '@react-navigation/stack';
import {SearchNavigatorStackParams} from '../../types/navigationTypes';

type props = StackScreenProps<SearchNavigatorStackParams, 'UpdateFilteredNote'>;

const UpdateFilteredNote = ({navigation, route}: props) => {
  const dispatch = useAppDispatch();

  const {noteId, content, tags, title} = route.params;

  const [updateNote, {isError, isLoading, isSuccess, error, data}] =
    useUpdateNoteMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateNoteData({
          noteId,
          data: data?.note,
        }),
      );
      navigation.navigate('Search');
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
        <KeyboardAvoidingView style={styles.screen}>
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
                style={styles.textInputStyle}
                mode="flat"
                label="Description"
                value={values.content}
                multiline
                numberOfLines={10}
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
                      style={styles.textInputStyle}
                      mode="flat"
                      label="Tag"
                      value={values.tag}
                      onChangeText={handleChange('tag')}
                      onBlur={handleBlur('tag')}
                      error={!!errors.tag && touched.tag}
                    />
                    {errors.tag && touched.tag && (
                      <Text style={styles.errorText}>{errors.tag}</Text>
                    )}
                    {errors.tags && (
                      <Text style={styles.errorText}>{errors.tags}</Text>
                    )}
                    <Button onPress={() => values.tags.push(values.tag)}>
                      Add Tag
                    </Button>
                  </View>
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
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  scrollContainer: {
    marginBottom: 80,
  },
  textInputStyle: {
    margin: 20,
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

export default UpdateFilteredNote;
