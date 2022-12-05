import styled from 'styled-components';

const Container = styled.main`
  padding: 20px 15px;
  margin: 0 auto;
  width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: 85vw;
  }

  @media (max-width: 360px) {
    width: 95vw;
  }
`;

const ProtectedTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) => props.theme.fontSizes.h3};

  @media (max-width: 500px) {
    font-size: ${(props) => props.theme.fontSizes.h4};
  }
`;

export { Container, ProtectedTitle };
