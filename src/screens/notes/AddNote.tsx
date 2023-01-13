import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useCreateNoteMutation} from '../../redux/api/notesApi';
import {Formik} from 'formik';
import {addNoteValidationSchema} from '../../validations/notes/noteValidation';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {MainStackParams} from '../../navigation/MainNavigation';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch} from '../../redux/hooks';
import {setNote} from '../../redux/auth/notesSlice';

type props = StackScreenProps<MainStackParams, 'AddNote'>;

interface formValues {
  title: string;
  content: string;
  tag: string;
  tags: string[];
  categoryTitle: string;
}

const AddNote = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const [createNote, {isError, isLoading, isSuccess, error, data}] =
    useCreateNoteMutation();

  console.log(data);

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
                  <Button
                    onPress={() => {
                      return (
                        values.tags.push(values.tag),
                        console.log(values.tag, values.tags)
                      );
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
              multiline={true}
              numberOfLines={5}
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
                const tagsArray = values.tags.filter((filteredTag, index) => {
                  if (filteredTag === tag) {
                    values.tags.splice(index, 1);
                    return true;
                  }
                  return false;
                });
                console.log(values.tags);
              }}>
              {tag}
            </Button>
          ))}
        </ScrollView>
      )}
    </Formik>
  );
};

export default AddNote;
