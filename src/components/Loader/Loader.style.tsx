import styled, { keyframes } from 'styled-components';

const loadAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryColor};
  background: -moz-linear-gradient(
    left,
    ${({ theme }) => theme.colors.primaryColor} 10%,
    rgba(0, 112, 160, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    ${({ theme }) => theme.colors.primaryColor} 10%,
    rgba(0, 112, 160, 0) 42%
  );
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primaryColor} 10% rgba(0, 112, 160, 0) 42%
  );
  position: relative;
  animation: ${loadAnimation} 1.6s infinite linear;
  transform: translateZ(0);

  &:before {
    content: '';
    width: 50%;
    height: 50%;
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:after {
    content: '';
    background-color: ${({ theme }) => theme.colors.backgroundWhite};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export default StyledLoader;
