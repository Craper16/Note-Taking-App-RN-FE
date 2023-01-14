import * as yup from 'yup';

export const addNoteValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Note title is required')
    .min(5, 'Too short')
    .max(50, 'Too long'),
  content: yup
    .string()
    .required('Note description is required')
    .min(5, 'Too short')
    .max(4000, 'Too long'),
  tags: yup
    .array()
    .of(yup.string())
    .required('Must add at least 1 tag')
    .max(10, 'Cannot add more than 10 tags'),
  tag: yup.string().min(3, 'Too short').max(15, 'Too long'),
  categoryTitle: yup.string().required('Category is required'),
});

export const updateNoteValidations = yup.object().shape({
  title: yup
    .string()
    .required('Note title is required')
    .min(5, 'Too short')
    .max(50, 'Too long'),
  content: yup
    .string()
    .required('Note description is required')
    .min(5, 'Too short')
    .max(4000, 'Too long'),
  tags: yup
    .array()
    .of(yup.string())
    .required('Must add at least 1 tag')
    .max(10, 'Cannot add more than 10 tags'),
  tag: yup.string().min(3, 'Too short').max(15, 'Too long'),
});
