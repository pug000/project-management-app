interface ColorProps {
  $color?: string;
}

interface BackgroundColorProps {
  $backgroundColor?: string;
}

interface WidthProps {
  $width?: string;
}

interface Author {
  id: number;
  name: string;
  githubLink: string;
  title: string;
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

interface ParsedJwt {
  id: string;
  login: string;
  exp: number;
  iat: number;
}

interface AuthUser {
  token: string;
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

interface UserData extends User {
  _id: string;
}

export type {
  ColorProps,
  BackgroundColorProps,
  WidthProps,
  Author,
  UserFormValues,
  User,
  ParsedJwt,
  AuthUser,
  FormTextField,
  UserData,
};
