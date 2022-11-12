import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.text};
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
    font-size: ${({ theme }) => theme.fontSizes.text};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.backgroundWhite};
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template: auto 1fr auto / 1fr minmax(300px, 1024px) 1fr;
    grid-template-areas: " header header header "
  											". main ."
  											". footer ."
  }

  header {
    grid-area: header;
    display: grid;
    grid-template: auto 1fr auto / 1fr minmax(300px, 1024px) 1fr;
    grid-template-areas: ". subHeader ."
  }

  main {
    grid-area: main;
  }

  footer {
    grid-area: footer;
  }
`;

export default GlobalStyle;
