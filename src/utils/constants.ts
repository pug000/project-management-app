import { FormTextField, UserFormValues, Author } from 'ts/interfaces';

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

const authors: Author[] = [
  {
    id: 1,
    name: 'roma',
    githubLink: 'https://github.com/pug000',
    title: 'Roman on GitHub',
  },
  {
    id: 2,
    name: 'nastya',
    githubLink: 'https://github.com/saachko',
    title: 'Anastasiya on GitHub',
  },
  {
    id: 3,
    name: 'artem',
    githubLink: 'https://github.com/aArt13',
    title: 'Artsiom on GitHub',
  },
];

export {
  baseUrl,
  authors,
  defaultUserFormValues,
  nameValidation,
  loginValidation,
  passwordValidation,
  formTextFields,
};
