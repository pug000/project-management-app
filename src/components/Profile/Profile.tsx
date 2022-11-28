import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { getUser } from 'redux/selectors/userSelectors';
import { setDeleteUserPopupOpen } from 'redux/slices/userSlice';

import Button from 'components/Button/Button';

import { profileButtonsList } from 'utils/constants';

import {
  ButtonWrapper,
  ProfileContainer,
  ProfileMainContent,
  ProfileText,
  ProfileTextWrapper,
  ProfileTitle,
  ProfileWrapper,
} from './Profile.style';

function Profile() {
  const { t } = useTranslation('translation');
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showPopupOrEditPageOnClick = useCallback((id: number) => {
    if (id === 2) {
      dispatch(setDeleteUserPopupOpen(true));
    } else {
      navigate('/profile/edit');
    }
  }, []);

  return (
    <ProfileContainer>
      <ProfileMainContent>
        <ProfileTitle>{t('profile.title')}</ProfileTitle>
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
      </ProfileMainContent>
      <ButtonWrapper>
        {profileButtonsList.map(({ id, text, width, backgroundColor }) => (
          <Button
            key={id}
            type="button"
            width={width}
            backgroundColor={backgroundColor}
            callback={() => showPopupOrEditPageOnClick(id)}
          >
            {t(text)}
          </Button>
        ))}
      </ButtonWrapper>
    </ProfileContainer>
  );
}

export default memo(Profile);
