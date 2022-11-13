import styled, { keyframes, css } from 'styled-components';
import { BackgroundColorProps, ColorProps, WidthProps } from 'ts/interfaces';

interface IsBackProps {
  $isBack?: boolean;
}

type ButtonProps = ColorProps & BackgroundColorProps & WidthProps & IsBackProps;

const buttonAnimationLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-15px);
  }
  50% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(0);
  }
`;

const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.text};
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  color: ${({ $color, theme }) => $color ?? theme.colors.textButton};
  border: none;
  padding: 8px;
  min-width: ${({ $width }) => $width ?? '175px'};
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.primaryColor};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover:enabled {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
    animation: ${({ $isBack }) =>
      $isBack &&
      css`
        ${buttonAnimationLeft} 1s linear infinite;
      `};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ $isBack, theme }) =>
      $isBack ? theme.colors.transparent : theme.colors.grey};
    cursor: default;
  }

  &:active:enabled {
    opacity: ${({ theme }) => theme.effects.activeOpacity};
  }
`;

export default StyledButton;
