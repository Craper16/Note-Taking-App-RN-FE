import * as yup from 'yup';

export const addCategoryValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Category title must not be empty')
    .min(3, 'Too short')
    .max(15, 'Too long'),
});
