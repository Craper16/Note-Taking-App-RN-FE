import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Formik} from 'formik';
import {addCategoryValidationSchema} from '../../validations/categories/categoryValidations';
import {Colors} from '../../config/colors/colors';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {TextInput, Button} from 'react-native-paper';
import {useAddCategoryMutation} from '../../redux/api/categoriesApi';
import {StackScreenProps} from '@react-navigation/stack';
import {CategoryNavigatorStackParams} from '../../types/navigationTypes';
import {
  addCategoryToDropDown,
  setCategory,
} from '../../redux/categories/categoriesSlice';

type props = StackScreenProps<CategoryNavigatorStackParams, 'AddCategory'>;

const AddCategory = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const [addCategory, {data, isError, error, isSuccess, isLoading}] =
    useAddCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log('isRunning');
      dispatch(setCategory({data: data?.data.category}));
      dispatch(
        addCategoryToDropDown({
          label: data?.data?.category?.title,
          value: data?.data.category.title,
        }),
      );
      navigation.goBack();
    }
  }, [isSuccess, dispatch]);

  return (
    <Formik
      initialValues={{title: ''}}
      validateOnMount={true}
      onSubmit={values => addCategory({...values})}
      validationSchema={addCategoryValidationSchema}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        values,
        isValid,
        touched,
      }) => (
        <View style={styles.screen}>
          <View style={styles.textInputContainer}>
            <TextInput
              mode="outlined"
              label="Category title"
              onBlur={handleBlur('title')}
              value={values.title}
              onChangeText={handleChange('title')}
              error={!!errors.title && touched.title}
            />
            {errors.title && touched.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}
          </View>
          {isError && (
            <View>
              <Text style={styles.errorApiResponseText}>
                {(error as any).data.message || (error as any).error}
              </Text>
            </View>
          )}
          <View style={styles.actionsContainer}>
            <Button disabled={!isValid || isLoading} onPress={handleSubmit}>
              Add Category
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  textInputContainer: {
    margin: 12,
    padding: 5,
  },
  actionsContainer: {
    margin: 30,
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

export default AddCategory;
