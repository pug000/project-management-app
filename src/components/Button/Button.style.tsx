import styled from 'styled-components';
import { BackgroundColorProps, ColorProps, WidthProps } from 'ts/interfaces';

type ButtonProps = ColorProps & BackgroundColorProps & WidthProps;

const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.text};
  align-self: center;
  justify-self: center;
  color: ${({ $color, theme }) => $color ?? theme.colors.textButton};
  border: none;
  padding: 8px 0;
  width: ${({ $width }) => $width ?? '175px'};
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.primaryColor};
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

  &:active:enabled {
    opacity: ${({ theme }) => theme.effects.activeOpacity};
  }
`;

export default StyledButton;
