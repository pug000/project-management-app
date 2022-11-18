import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';

import { getUser } from 'redux/selectors/userSelectors';

import Button from 'components/Button/Button';

import { Title } from 'styles/styles';
import { profileButtonsList } from 'utils/constants';
import {
  ButtonWrapper,
  ProfileContainer,
  ProfileText,
  ProfileTextWrapper,
  ProfileWrapper,
} from './Profile.style';

function Profile() {
  const { t } = useTranslation('translation');
  const user = useAppSelector(getUser);

  return (
    <ProfileContainer>
      <Title>{t('profile.title')}</Title>
      <ProfileWrapper>
        <ProfileTextWrapper>
          <ProfileText>{`${t('authorization.name')}:`}</ProfileText>
          <ProfileText>{user?.name}</ProfileText>
        </ProfileTextWrapper>
        <ProfileTextWrapper>
          <ProfileText>{`${t('authorization.login')}:`}</ProfileText>
          <ProfileText>{user?.login}</ProfileText>
        </ProfileTextWrapper>
      </ProfileWrapper>
      <ButtonWrapper>
        {profileButtonsList.map(({ id, text, width, backgroundColor }) => (
          <Button key={id} type="button" width={width} backgroundColor={backgroundColor}>
            {t(text)}
          </Button>
        ))}
      </ButtonWrapper>
    </ProfileContainer>
  );
}

export default Profile;
