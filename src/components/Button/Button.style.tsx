import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.text};
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border: none;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  transition: ${({ theme }) => theme.effects.transition};

  &:hover:enabled {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey};
    cursor: default;
  }
`;

export default StyledButton;
