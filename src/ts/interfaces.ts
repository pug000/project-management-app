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
  _id?: string;
  name: string;
  login: string;
  password?: string;
}

export type { ColorProps, BackgroundColorProps, WidthProps, UserFormValues, User };
