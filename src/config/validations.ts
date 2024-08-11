import * as yup from 'yup';
import i18n from 'i18next';
const emailSchema = yup
  .string()
  .email(i18n.t('invalid_email'))
  .required(i18n.t('email_required'));
const passwordSchema = yup
  .string()
  .min(8, i18n.t('password_min_length'))
  .required(i18n.t('password_required'));

export const SignupValidationSchemas = {
  AE: yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9]{5,}$/, i18n.t('username_alphanumeric_min_5'))
      .required(i18n.t('username_is_required_field')),
  }),
  IN: yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    username: yup
      .string()
      .matches(
        /^(?=[A-Za-z])(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,}$/,
        i18n.t('username_start_letter_min_6'),
      )
      .required(i18n.t('username_is_required_field')),
  }),
  US: yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9]{6,}$/, i18n.t('username_alphanumeric_min_6'))
      .required(i18n.t('username_is_required_field')),
  }),
  EG: yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9]{4,}$/, i18n.t('username_alphanumeric_min_4'))
      .required(i18n.t('username_is_required_field')),
  }),
};

export const LoginValidationScem = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
