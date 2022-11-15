import React from 'react';
import { Variants } from 'framer-motion';
import theme from 'styles/theme';

import {
  FormTextField,
  UserFormValues,
  HeaderLinksProps,
  Author,
  MainPageElement,
} from 'ts/interfaces';

import { GrProjects, GrTask } from 'react-icons/gr';
import { GoProject } from 'react-icons/go';

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
    description: 'romaDescription',
    avatar: 'https://avatars.githubusercontent.com/u/95237510?v=4',
    background: 'rgba(0, 0, 0, 0.1)',
  },
  {
    id: 2,
    name: 'nastya',
    githubLink: 'https://github.com/saachko',
    title: 'Anastasiya on GitHub',
    description: 'nastyaDescription',
    avatar: 'https://avatars.githubusercontent.com/u/95384801?v=4',
    background: 'rgba(247, 206, 220, 0.5)',
  },
  {
    id: 3,
    name: 'artem',
    githubLink: 'https://github.com/aArt13',
    title: 'Artsiom on GitHub',
    description: 'artemDescription',
    avatar: 'https://avatars.githubusercontent.com/u/88494012?v=4',
    background: 'rgba(230, 247, 255, 0.9);',
  },
];

const headerSignItems: HeaderLinksProps[] = [
  {
    id: 1,
    text: 'signIn.title',
    link: '/signin',
    color: theme.colors.primaryColor,
    backgroundColor: theme.colors.transparent,
  },
  {
    id: 2,
    text: 'signUp.title',
    link: '/signup',
    color: theme.colors.textButton,
    backgroundColor: theme.colors.backgroundDarkBlue,
  },
];

const headerItemsIfLoggedIn: HeaderLinksProps[] = [
  {
    id: 3,
    text: 'signOut.text',
    link: '/',
    color: theme.colors.primaryColor,
    backgroundColor: theme.colors.transparent,
  },
  {
    id: 4,
    text: 'edit.text',
    link: '/edit',
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

const mainPageElements: MainPageElement[] = [
  {
    id: 1,
    title: 'blockTitle1',
    text: 'blockText1',
    backgroundColor: theme.colors.yellow,
    icon: <GrProjects />,
  },
  {
    id: 2,
    title: 'blockTitle2',
    text: 'blockText2',
    backgroundColor: theme.colors.blue,
    icon: <GoProject />,
  },
  {
    id: 3,
    title: 'blockTitle3',
    text: 'blockText3',
    backgroundColor: theme.colors.pink,
    icon: <GrTask />,
  },
];

const mainPageList = [
  {
    id: 1,
    text: 'listItem1',
  },
  {
    id: 2,
    text: 'listItem2',
  },
  {
    id: 3,
    text: 'listItem3',
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
  headerItemsIfLoggedIn,
  mainPageElements,
  mainPageList,
  backButtonAnimation,
  notificationAnimation,
};
