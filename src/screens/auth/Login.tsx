import React, {useEffect, useState} from 'react';

import {Text, Button, TextInput} from 'react-native-paper';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAppDispatch} from '../../redux/hooks';
import {useSignInUserMutation} from '../../redux/api/authApi';
import {setUser} from '../../redux/auth/authSlice';
import {loginValidationSchema} from '../../validations/auth/authValidations';
import {Formik} from 'formik';
import {storeKeychainData} from '../../storage/keychain';
import type {StackScreenProps} from '@react-navigation/stack';
import type {AuthStackParams} from '../../types/navigationTypes';
import {Colors} from '../../config/colors/colors';

type props = StackScreenProps<AuthStackParams, 'Login'>;

const Login = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(true);

  const [signInUser, {data, isError, error, isLoading, isSuccess}] =
    useSignInUserMutation();

  useEffect(() => {
    if (isSuccess) {
      storeKeychainData(data?.username, data?.accessToken);
      dispatch(
        setUser({accessToken: data?.accessToken, username: data?.username}),
      );
    }
  }, [isSuccess, dispatch, data?.accessToken, data?.username]);

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      validateOnMount={true}
      onSubmit={values => signInUser({...values})}
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.mainContainer}>
            <Text style={styles.title}>Login to view your notes</Text>
            {isError && (
              <View style={styles.apiErrorsContainer}>
                <Text style={styles.apiErrors}>
                  {(error as any).data?.message || (error as any).error}
                </Text>
              </View>
            )}
            <View style={styles.inputContainer}>
              <ScrollView>
                <View style={styles.textInputContainer}>
                  <TextInput
                    testID="username"
                    disabled={isLoading}
                    autoCapitalize="none"
                    textColor="black"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    autoCorrect={false}
                    theme={{colors: {primary: 'black'}}}
                    mode="flat"
                    label="Username"
                    error={!!errors.username && touched.username}
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errors}>{errors.username}</Text>
                  )}
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    testID="password"
                    disabled={isLoading}
                    autoCapitalize="none"
                    textColor="black"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    mode="flat"
                    theme={{colors: {primary: 'black'}}}
                    autoCorrect={false}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    secureTextEntry={showPassword}
                    label="Password"
                    error={!!errors.password && touched.password}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.actions}>
                  <Button
                    testID="loginButton"
                    disabled={!isValid || isLoading}
                    onPress={handleSubmit}
                    mode="contained"
                    loading={isLoading}>
                    Login
                  </Button>
                </View>
                <Button
                  onPress={() => {
                    navigation.navigate('Signup');
                  }}>
                  Not registered yet? Signup Now!
                </Button>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
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
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.secondary,
  },
  inputContainer: {
    width: '80%',
    padding: 2,
    marginBottom: 9,
    marginVertical: 14,
  },
  textInputContainer: {
    margin: 5,
    padding: 4,
    justifyContent: 'center',
  },
  errors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'tomato',
  },
  apiErrorsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiErrors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    color: 'red',
  },
  actions: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
