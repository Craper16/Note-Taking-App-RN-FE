import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Text, Button, TextInput} from 'react-native-paper';
import {useSignUpUserMutation} from '../../redux/api/authApi';
import {useAppDispatch} from '../../redux/hooks';
import {setUser} from '../../redux/auth/authSlice';
import {signupValidationSchema} from '../../validations/auth/authValidations';
import {Formik} from 'formik';
import {storeKeychainData} from '../../storage/keychain';

const Signup = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [signUpUser, {data, isError, error, isLoading, isSuccess}] =
    useSignUpUserMutation();

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
      initialValues={{username: '', password: '', confirmPassword: ''}}
      validateOnMount={true}
      onSubmit={values => signUpUser({...values})}
      validationSchema={signupValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        touched,
        errors,
      }) => (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.mainContainer}>
            <Text style={styles.title}>Sign Up</Text>
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
                    autoCapitalize="none"
                    textColor="black"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    mode="flat"
                    theme={{colors: {primary: 'black'}}}
                    label="Username"
                    autoCorrect={false}
                    error={!!errors.username && touched.username}
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errors}>{errors.username}</Text>
                  )}
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    testID="password"
                    autoCapitalize="none"
                    textColor="black"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    mode="flat"
                    theme={{colors: {primary: 'black'}}}
                    autoCorrect={false}
                    secureTextEntry={showPassword}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    label="Password"
                    error={!!errors.password && touched.password}
                  />
                  {errors.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    testID="confirmPassword"
                    autoCapitalize="none"
                    textColor="black"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    mode="flat"
                    theme={{colors: {primary: 'black'}}}
                    autoCorrect={false}
                    right={
                      <TextInput.Icon
                        icon={showConfirmPassword ? 'eye' : 'eye-off'}
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    }
                    secureTextEntry={showConfirmPassword}
                    label="Confirm Password"
                    error={!!errors.confirmPassword && touched.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errors}>{errors.confirmPassword}</Text>
                  )}
                </View>
                <View style={styles.actions}>
                  <Button
                    testID="loginButton"
                    disabled={!isValid || isLoading}
                    onPress={handleSubmit}
                    mode="contained"
                    loading={isLoading}>
                    Signup
                  </Button>
                </View>
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
    backgroundColor: '#1f1f1f',
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
    color: '#8A2BE2',
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
    color: 'red',
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

export default Signup;
