import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      title: string;
      text: string;
      textButton: string;
      backgroundWhite: string;
      backgroundGrey: string;
      backgroundBlue: string;
      backgroundDarkBlue: string;
      white: string;
      pink: string;
      red: string;
      blue: string;
      yellow: string;
      grey: string;
      black: string;
      darkBlue: string;
      primaryColor: string;
      transparent: string;
    };
    fonts: {
      title: string;
      text: string;
    };
    fontsWeight: {
      regular: number;
      medium: number;
      bold: number;
    };
    fontSizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      text: string;
      smallText: string;
      noteText: string;
      smallNoteText: string;
    };
    effects: {
      transition: string;
      hoverOpacity: string;
      activeOpacity: string;
      hoverTransform: string;
    };
  }
}

const defaultTheme: DefaultTheme = {
  colors: {
    title: '#1f1f1f',
    text: '#1f1f1f',
    textButton: '#ffffff',
    backgroundWhite: '#ffffff',
    backgroundGrey: '#f7f9fa',
    backgroundBlue: '#e6f7ff',
    backgroundDarkBlue: '#006b99',
    white: '#ffffff',
    pink: '#f7cedc',
    red: '#ff6347',
    blue: '#cceff6',
    yellow: '#faea73',
    grey: '#969FA4',
    black: '#1f1f1f',
    darkBlue: '#006b99',
    primaryColor: '#0070a0',
    transparent: 'transparent',
  },
  fonts: {
    title: 'Fraunces, serif',
    text: 'Inter, sans-serif',
  },
  fontsWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    h1: '58px',
    h2: '42px',
    h3: '36px',
    h4: '25px',
    h5: '21px',
    text: '18px',
    smallText: '16px',
    noteText: '14px',
    smallNoteText: '13px',
  },
  effects: {
    transition: 'all 0.2s ease-out',
    hoverOpacity: '0.6',
    activeOpacity: '0.4',
    hoverTransform: 'scale(1.2)',
  },
};

export default defaultTheme;
