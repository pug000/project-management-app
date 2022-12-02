import React from 'react';
import theme from 'styles/theme';

import {
  FormTextField,
  UserFormValues,
  HeaderLinksProps,
  Author,
  MainPageElement,
  EditFormValues,
  RadioInputItem,
  ColumnFormValues,
  SearchBarValues,
  SelectOptions,
} from 'ts/interfaces';

import { GrProjects, GrTask } from 'react-icons/gr';
import { GoProject } from 'react-icons/go';
import BlueSvg from 'pages/ProfilePage/SvgElements/BlueSvg';
import PinkSvg from 'pages/ProfilePage/SvgElements/PinkSvg';
import YellowSvg from 'pages/ProfilePage/SvgElements/YellowSvg';

const baseUrl = 'https://project-management-ka5v.onrender.com/';

const nameValidation = /^(?=[a-zA-Z._ ]*$)(?!.*[_.]).*/gm;

const loginValidation = /^(?=[a-zA-Z0-9._]*$)(?!.*[_.])[^_.].*/gm;

const passwordValidation = /^[a-zA-Z0-9](?!.*[_.()\\ /|=+№;:?*,"'`^%-]).*/gm;

const defaultUserFormValues: UserFormValues = {
  name: '',
  login: '',
  password: '',
};

const radioInputList: RadioInputItem[] = [
  {
    id: 'primary',
    value: theme.colors.darkBlue,
    checked: true,
  },
  {
    id: 'yellow',
    value: theme.colors.yellow,
    checked: false,
  },
  {
    id: 'pink',
    value: theme.colors.pink,
    checked: false,
  },
  {
    id: 'blue',
    value: theme.colors.blue,
    checked: false,
  },
];

const formTextFields: FormTextField[] = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    placeholderText: 'authorization.name',
    pattern: {
      value: nameValidation,
      message: 'authorization.namePattern',
    },
    minLength: {
      value: 3,
      message: 'authorization.nameMinLength',
    },
    required: 'authorization.required',
  },
  {
    id: 2,
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
    id: 3,
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

const projectDescriptionValidation = {
  count: 80,
  message: 'projects.maxLength',
  value: 'projects.description',
};

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
    id: 'signIn',
    text: 'signIn.title',
    link: '/signin',
    color: theme.colors.primaryColor,
    backgroundColor: theme.colors.transparent,
  },
  {
    id: 'signUp',
    text: 'signUp.title',
    link: '/signup',
    color: theme.colors.textButton,
    backgroundColor: theme.colors.backgroundDarkBlue,
  },
];

const headerItemsIfLoggedIn: HeaderLinksProps[] = [
  {
    id: 'signOut',
    text: 'signOut.text',
    link: '#',
    color: theme.colors.primaryColor,
    backgroundColor: theme.colors.transparent,
  },
  {
    id: 'profile',
    text: 'profile.title',
    link: '/profile',
    color: theme.colors.textButton,
    backgroundColor: theme.colors.backgroundDarkBlue,
  },
];

const headerLinkItems: HeaderLinksProps[] = [
  {
    id: 'home',
    text: 'home.text',
    link: '/',
  },
  {
    id: 'projects',
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

const profileIconsList = [
  {
    id: 1,
    icon: <BlueSvg />,
  },
  {
    id: 2,
    icon: <YellowSvg />,
  },
  {
    id: 3,
    icon: <PinkSvg />,
  },
];

const profileButtonsList = [
  {
    id: 1,
    text: 'profile.edit',
    width: '180px',
  },
  {
    id: 2,
    text: 'profile.delete',
    width: '180px',
    backgroundColor: theme.colors.pink,
  },
];

const defaultFormItemValues: EditFormValues = {
  title: '',
  description: '',
  color: '',
  responsibleUser: '',
};

const defaultColumnFormValues: ColumnFormValues = {
  title: '',
};

const defaultSearchBarValues: SearchBarValues = {
  title: '',
};

const defaultSelectOptions: SelectOptions[] = [
  {
    value: '',
    label: '',
  },
];

export {
  baseUrl,
  authors,
  defaultUserFormValues,
  nameValidation,
  loginValidation,
  passwordValidation,
  radioInputList,
  formTextFields,
  headerSignItems,
  headerLinkItems,
  headerItemsIfLoggedIn,
  mainPageElements,
  mainPageList,
  profileIconsList,
  profileButtonsList,
  projectDescriptionValidation,
  defaultFormItemValues,
  defaultColumnFormValues,
  defaultSearchBarValues,
  defaultSelectOptions,
};
