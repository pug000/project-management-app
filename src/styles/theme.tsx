import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    [key: string]: string;
  }
}

const defaultTheme: DefaultTheme = {};

export default defaultTheme;
