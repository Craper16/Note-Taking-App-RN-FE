import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username must not be empty'),
  password: yup.string().required('Password must not be empty'),
});

export const signupValidationSchema = yup.object().shape({
  username: yup.string().required('Username must not be empty'),
  password: yup
    .string()
    .required('Password must not be empty')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      'Password must contain 8 or more characters, 1 upper case letter, 1 lower case letter and a special character',
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
