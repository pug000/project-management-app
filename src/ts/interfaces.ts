import { Variants } from 'framer-motion';

interface ColorProps {
  $color?: string;
}

interface BackgroundColorProps {
  $backgroundColor?: string;
}

interface WidthProps {
  $width?: string;
}

interface IconsProps {
  $isDisabled?: boolean;
}
interface VariantsProps {
  $variants?: Variants;
}

interface HeaderLinksProps {
  id: string;
  text: string;
  link: string;
  color?: string;
  backgroundColor?: string;
}

interface Author {
  id: number;
  name: string;
  githubLink: string;
  title: string;
  description: string;
  avatar: string;
  background: string;
}

interface UserFormValues {
  name: string;
  login: string;
  password: string;
}

interface User {
  name?: string;
  login: string;
  password: string;
}

interface AuthUser {
  token: string;
  exp: number;
  _id: string;
}

interface FormFieldValidation<T> {
  value: T;
  message: string;
}

interface FormTextField {
  id: number;
  type: string;
  name: string & keyof UserFormValues;
  placeholderText: string;
  required: string;
  minLength: FormFieldValidation<number>;
  pattern: FormFieldValidation<RegExp>;
}

interface RadioInputItem {
  id: string;
  value: string;
  checked: boolean;
}

interface UserData extends User {
  _id: string;
}

interface MainPageElement {
  id: number;
  title: string;
  text: string;
  backgroundColor: string;
  icon: JSX.Element;
}

interface ProjectData {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

interface Project extends ProjectData {
  description: string;
}

interface EditFormValues {
  title: string;
  description: string;
  color: string;
}

export type {
  ColorProps,
  BackgroundColorProps,
  WidthProps,
  IconsProps,
  HeaderLinksProps,
  Author,
  UserFormValues,
  User,
  AuthUser,
  FormTextField,
  RadioInputItem,
  UserData,
  VariantsProps,
  MainPageElement,
  ProjectData,
  Project,
  EditFormValues,
};
