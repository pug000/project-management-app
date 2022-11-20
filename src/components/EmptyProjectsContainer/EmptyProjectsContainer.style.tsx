import styled from 'styled-components';

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.4;

  Button {
    text-decoration: underline;
  }
`;

const Title = styled.h4`
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
`;

export { Container, Title };
