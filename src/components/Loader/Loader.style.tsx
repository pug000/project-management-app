import styled, { keyframes } from 'styled-components';

const loadAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
`;

const StyledLoader = styled.div`
  display: block;
  position: absolute;
  top: 45%;
  left: 50%;
  height: 120px;
  width: 120px;
  margin: -60px 0 0 -60px;
  border: 10px rgba(0, 0, 0, 0.25) solid;
  border-top: 10px ${({ theme }) => theme.colors.primaryColor} solid;
  border-radius: 50%;
  animation: ${loadAnimation} 1s infinite linear;
  z-index: 5;
`;

export { StyledLoader, Background };
