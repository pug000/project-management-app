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
`;

const AuthorsContainer = styled.div``;

const AuthorsTitle = styled.h3`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  margin-bottom: 5px;
`;

const Authors = styled.div``;

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
`;

const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
