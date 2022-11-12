import { FormTextField, UserFormValues } from 'ts/interfaces';

const baseUrl = 'https://project-management.up.railway.app/';

const nameValidation = /^(?=[a-zA-Z._]*$)(?!.*[_.]).*/gm;

const loginValidation = /^(?=[a-zA-Z0-9._]*$)(?!.*[_.])[^_.].*/gm;

const passwordValidation = /^[a-zA-Z0-9](?!.*[_.()\\ /|=+№;:?*,"'`^%-]).*/gm;

const defaultUserFormValues: UserFormValues = {
  name: '',
  login: '',
  password: '',
};

const formTextFields: FormTextField[] = [
  {
    id: 1,
    name: 'login',
    type: 'text',
    placeholderText: 'authorization.login',
    pattern: {
      value: loginValidation,
      message: 'authorization.loginPattern',
    },
    minLength: {
      value: 4,
      message: 'authorization.authMinLength',
    },
    required: 'authorization.required',
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholderText: 'authorization.password',
    pattern: {
      value: passwordValidation,
      message: 'authorization.passwordPattern',
    },
    minLength: {
      value: 8,
      message: 'authorization.authMinLength',
    },
    required: 'authorization.required',
  },
];

export {
  baseUrl,
  defaultUserFormValues,
  nameValidation,
  loginValidation,
  passwordValidation,
  formTextFields,
};
