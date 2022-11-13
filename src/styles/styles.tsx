import { GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IconsProps } from 'ts/interfaces';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 10px;
`;

const FormWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  padding: 20px;
  border-radius: 10px;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 25px;
  width: 100%;
`;

const FormDescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  white-space: nowrap;
  border: 0px;
  gap: 10px;

  &:before {
    position: relative;
    width: 100%;
    border-top: thin solid rgba(0, 0, 0, 0.12);
    content: '';
    transform: translateY(50%);
  }

  &:after {
    position: relative;
    width: 100%;
    border-top: thin solid rgba(0, 0, 0, 0.12);
    content: '';
    transform: translateY(50%);
  }
`;

const FormDescriptionText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.text};
`;

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.effects.transition};
  line-height: 25px;
  text-align: center;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  &:link {
    text-decoration: none;
  }
`;

const StyledPrevIcon = styled(GrPrevious)<IconsProps>`
  polyline {
    stroke: ${({ $isDisabled, theme }) =>
      $isDisabled ? theme.colors.grey : theme.colors.primaryColor};
  }
`;

export {
  MainWrapper,
  Title,
  FormWrapper,
  FormHeader,
  Form,
  FormDescriptionWrapper,
  FormDescriptionText,
  StyledLink,
  StyledPrevIcon,
};
