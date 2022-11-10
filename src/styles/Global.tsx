import { createGlobalStyle } from 'styled-components';
import defaultTheme from './theme';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${defaultTheme.fonts.text};
    font-weight: ${defaultTheme.fontsWeight.regular};
    font-size: ${defaultTheme.fontSizes.text};
    color: ${defaultTheme.colors.text};
    background-color: ${defaultTheme.colors.backgroundWhite};
  }
`;

export default GlobalStyle;
