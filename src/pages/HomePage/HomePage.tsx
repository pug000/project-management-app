import React, { memo } from 'react';
import { useAppSelector } from 'hooks/useRedux';
import { useTranslation } from 'react-i18next';

import { getLoggedIn } from 'redux/selectors/userSelectors';

import { MainWrapper } from 'styles/styles';

import { authors, mainPageElements, mainPageList } from 'utils/constants';

import Button from 'components/Button/Button';
import BoardSvg from './SvgElements/BoardSvg';
import ComputerSvg from './SvgElements/ComputerSvg';

import {
  TextSection,
  ColumnSection,
  TextWrapper,
  Title,
  Text,
  Link,
  ImageWrapper,
  MainPageElement,
  ElementTitle,
  SubTitle,
  Author,
  AuthorName,
  AuthorDescription,
} from './HomePage.style';

function HomePage() {
  const { t } = useTranslation('translation', { keyPrefix: 'homePage' });
  const isLoggedIn = useAppSelector(getLoggedIn);

  return (
    <MainWrapper>
      <TextSection>
        <TextWrapper>
          <Title>{t('title1')}</Title>
          <Text>{t('text1')}</Text>
          <Link to={isLoggedIn ? '/projects' : '/signup'}>
            <Button type="button">
              {isLoggedIn ? `${t('buttonIfLoggedIn')}` : `${t('buttonIfNotLoggedIn')}`}
            </Button>
          </Link>
        </TextWrapper>
        <ImageWrapper>
          <BoardSvg />
        </ImageWrapper>
      </TextSection>
      <SubTitle>{t('subtitle')}</SubTitle>
      <ColumnSection>
        {mainPageElements.map((el) => (
          <MainPageElement key={el.id} $backgroundColor={el.backgroundColor}>
            {el.icon}
            <ElementTitle>{t(el.title)}</ElementTitle>
            <p>{t(el.text)}</p>
          </MainPageElement>
        ))}
      </ColumnSection>
      <TextSection>
        <ImageWrapper>
          <ComputerSvg />
        </ImageWrapper>
        <TextWrapper>
          <Title>{t('title2')}</Title>
          {mainPageList.map((item) => (
            <p key={item.id}>✔️ {t(item.text)}</p>
          ))}
        </TextWrapper>
      </TextSection>
      <SubTitle>{t('team')}</SubTitle>
      <ColumnSection>
        {authors.map((author) => (
          <Author
            key={author.id}
            href={author.githubLink}
            title={author.title}
            target="_blank"
            $backgroundColor={author.background}
          >
            <TextWrapper>
              <AuthorName>{t(author.name)}</AuthorName>
              <AuthorDescription>{t(author.description)}</AuthorDescription>
            </TextWrapper>
            <ImageWrapper>
              <img src={author.avatar} alt="author.name" />
            </ImageWrapper>
          </Author>
        ))}
      </ColumnSection>
    </MainWrapper>
  );
}

export default memo(HomePage);
