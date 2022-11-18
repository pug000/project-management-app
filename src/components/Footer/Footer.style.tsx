import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 20px 15px;
`;

const FooterContainer = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.colors.grey};
  padding-bottom: 20px;
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AuthorsContainer = styled.div``;

const AuthorsTitle = styled.h3`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  margin-bottom: 5px;

  @media (max-width: 700px) {
    text-align: left;
  }
`;

const Authors = styled.div`
  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
  }
`;

const Author = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.smallText};
  transition: ${({ theme }) => theme.effects.transition};
  padding-left: 10px;

  &:not(:last-child) {
    border-right: 1px solid grey;
    padding-right: 10px;
  }

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  @media (max-width: 700px) {
    padding-left: 0;
    padding-right: 10px;

    &:not(:first-child) {
      padding-left: 10px;
    }
  }

  @media (max-width: 530px) {
    border-right: none;
    padding-right: 0;

    &:not(:first-child) {
      padding-left: 0;
    }

    &:not(:last-child) {
      padding-right: 0;
      border-right: none;
    }
  }
`;

const CopyrightText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.noteText};
  line-height: 30px;
`;

const SchoolLogo = styled.a`
  display: inline-block;
  width: 80px;
  height: 30px;
  background: url(https://rs.school/images/rs_school_js.svg);
  background-size: cover;
`;

const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;

    ${SchoolLogo} {
      width: 160px;
      height: 60px;
    }
  }

  @media (max-width: 530px) {
    ${CopyrightText} {
      line-height: 20px;
      max-width: 230px;
      width: 100%;
    }
  }
`;

export {
  FooterWrapper,
  FooterContainer,
  Copyright,
  CopyrightText,
  SchoolLogo,
  AuthorsContainer,
  AuthorsTitle,
  Authors,
  Author,
};
