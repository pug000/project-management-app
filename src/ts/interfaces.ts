import { FieldValues } from 'react-hook-form';

interface ColorProps {
  $color?: string;
}

interface BackgroundColorProps {
  $backgroundColor?: string;
}

interface WidthProps {
  $width?: string;
}

interface UserFormValues extends FieldValues {
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

export type {
  ColorProps,
  BackgroundColorProps,
  WidthProps,
  UserFormValues,
  User,
  ParsedJwt,
  AuthUser,
};
