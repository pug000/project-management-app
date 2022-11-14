import { Variants } from 'framer-motion';
import theme from 'styles/theme';
import { FormTextField, UserFormValues, HeaderLinksProps, Author } from 'ts/interfaces';

const baseUrl = 'https://project-management-ka5v.onrender.com/';

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

const headerSignItems: HeaderLinksProps[] = [
  {
    id: 1,
    text: 'signIn.title',
    link: '/signin',
    color: theme.colors.primaryColor,
    backgroundColor: theme.colors.backgroundWhite,
  },
  {
    id: 2,
    text: 'signUp.title',
    link: '/signup',
    color: theme.colors.textButton,
    backgroundColor: theme.colors.backgroundDarkBlue,
  },
];

const headerLinkItems: HeaderLinksProps[] = [
  {
    id: 1,
    text: 'home.text',
    link: '/',
  },
  {
    id: 2,
    text: 'projects.text',
    link: '/projects',
  },
];

const backButtonAnimation: Variants = {
  initial: {
    x: 0,
  },
  exit: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    x: -10,
    transition: {
      repeat: Infinity,
      duration: 0.5,
      repeatType: 'reverse',
    },
  },
};

const notificationAnimation: Variants = {
  initial: {
    opacity: 0,
    y: '100vh',
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    y: '35vh',
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.5,
    },
  },
};

export {
  baseUrl,
  authors,
  defaultUserFormValues,
  nameValidation,
  loginValidation,
  passwordValidation,
  formTextFields,
  headerSignItems,
  headerLinkItems,
  backButtonAnimation,
  notificationAnimation,
};
