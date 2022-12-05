import { GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StylesConfig, GroupBase } from 'react-select';

import { MdOutlineDelete, MdClose, MdEdit } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';

import { ColorProps, IconsProps, SelectOptions } from 'ts/interfaces';

import defaultTheme from './theme';

const baseIconStyles = {
  width: '100%',
  height: '100%',
};

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 500px) {
    font-size: ${({ theme }) => theme.fontSizes.h4};
  }
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

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
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

const StyledDeleteIcon = styled(MdOutlineDelete).attrs({
  style: {
    ...baseIconStyles,
  },
})<ColorProps>`
  color: ${({ $color, theme }) => $color ?? theme.colors.grey};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const StyledEditIcon = styled(BiEdit).attrs({
  style: {
    ...baseIconStyles,
  },
})<ColorProps>`
  color: ${({ $color, theme }) => $color ?? theme.colors.grey};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const StyledEditTextIcon = styled(MdEdit).attrs({
  style: {
    width: '80%',
    height: '80%',
  },
})<ColorProps>`
  color: ${({ $color, theme }) => $color ?? theme.colors.grey};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const StyledConfirmIcon = styled(FiCheck).attrs({
  style: {
    ...baseIconStyles,
  },
})<ColorProps>`
  color: ${({ $color, theme }) => $color ?? theme.colors.grey};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

const StyledCloseIcon = styled(MdClose).attrs({
  style: {
    ...baseIconStyles,
  },
})<ColorProps>`
  color: ${({ $color, theme }) => $color ?? theme.colors.grey};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const selectorStyles: StylesConfig<
  string | SelectOptions,
  boolean,
  GroupBase<SelectOptions>
> = {
  control: (base, { isFocused }) => ({
    ...base,
    outline: 'none',
    border: isFocused
      ? `1px solid ${defaultTheme.colors.primaryColor}`
      : `1px solid ${defaultTheme.colors.grey}`,
    borderRadius: '3px',
    color: `${defaultTheme.colors.grey}`,
    boxShadow: isFocused ? `0px 10px 13px rgba(0, 0, 0, 0.07)` : 'none',
    transition: `${defaultTheme.effects.transition}`,
    '&:hover': {
      border: `1px solid ${defaultTheme.colors.primaryColor}`,
    },
  }),
};

export {
  MainWrapper,
  Title,
  FormWrapper,
  FormHeader,
  Form,
  FormDescriptionWrapper,
  FormDescriptionText,
  LinkWrapper,
  StyledLink,
  StyledPrevIcon,
  StyledDeleteIcon,
  StyledEditIcon,
  StyledEditTextIcon,
  StyledConfirmIcon,
  StyledCloseIcon,
  selectorStyles,
};
