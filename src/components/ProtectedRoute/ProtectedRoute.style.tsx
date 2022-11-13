import styled from 'styled-components';

const Container = styled.main`
  padding: 20px 15px;
  margin: 0 auto;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProtectedTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

export { Container, ProtectedTitle };
