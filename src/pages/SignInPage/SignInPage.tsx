import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useSignInUser from 'hooks/useSignInUser';

import { setErrorNotificationPopupOpen } from 'redux/slices/userSlice';

import { backButtonAnimation } from 'utils/animations';

import AuthForm from 'components/AuthForm/AuthForm';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import PopupNotification from 'components/PopupNotification/PopupNotification';

import {
  FormDescriptionText,
  FormDescriptionWrapper,
  FormHeader,
  FormWrapper,
  LinkWrapper,
  MainWrapper,
  StyledLink,
  StyledPrevIcon,
  Title,
} from 'styles/styles';
import defaultTheme from 'styles/theme';

function SignInPage() {
  const { isErrorNotificationPopupOpen, isLoadingAuth, signInErrorMessage, onSubmit } =
    useSignInUser();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  return (
    <MainWrapper>
      <FormWrapper>
        <FormHeader>
          <Button
            type="button"
            width="30px"
            animation={backButtonAnimation}
            backgroundColor={defaultTheme.colors.transparent}
            disabled={isLoadingAuth}
            callback={() => navigate(-1)}
          >
            <StyledPrevIcon $isDisabled={isLoadingAuth} />
          </Button>
        </FormHeader>
        <Title>{t('signIn.title')}</Title>
        <AuthForm keyPrefix="signIn" onSubmit={onSubmit} isLoadingAuth={isLoadingAuth} />
        <FormDescriptionWrapper>
          <FormDescriptionText>{t('other.or')}</FormDescriptionText>
        </FormDescriptionWrapper>
        <LinkWrapper>
          <StyledLink to="/signup">{t('signIn.account')}</StyledLink>
        </LinkWrapper>
      </FormWrapper>
      {isLoadingAuth && <Loader />}
      {signInErrorMessage && (
        <PopupNotification
          isPopupShown={isErrorNotificationPopupOpen}
          setPopupShown={setErrorNotificationPopupOpen}
          text={t(`${signInErrorMessage}`)}
          backgroundColor={defaultTheme.colors.pink}
        />
      )}
    </MainWrapper>
  );
}

export default memo(SignInPage);
