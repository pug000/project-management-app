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

  #root {
    min-height: 100vh;
    display: grid;
    grid-template: auto 1fr auto / 1fr minmax(300px, 1024px) 1fr;
    grid-template-areas: ". header ."
  											". main ."
  											". footer ."
  }

  header {
    grid-area: header;
  }

  main {
    grid-area: main;
  }

  footer {
    grid-area: footer;
  }
`;

export default GlobalStyle;
