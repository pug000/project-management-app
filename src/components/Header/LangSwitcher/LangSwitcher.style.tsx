import styled from 'styled-components';

const LangWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const LangContainer = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primaryColor};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export { LangWrapper, LangContainer };
