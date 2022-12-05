import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { backButtonAnimation } from 'utils/animations';

import useSignUpUser from 'hooks/useSignUpUser';

import AuthForm from 'components/AuthForm/AuthForm';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import PopupNotification from 'components/PopupNotification/PopupNotification';

import {
  FormDescriptionWrapper,
  FormDescriptionText,
  FormWrapper,
  MainWrapper,
  StyledLink,
  Title,
  FormHeader,
  StyledPrevIcon,
  LinkWrapper,
} from 'styles/styles';
import defaultTheme from 'styles/theme';
import { setErrorNotificationPopupOpen } from 'redux/slices/userSlice';

function SignUpPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const { isErrorNotificationPopupOpen, isLoadingAuth, signUpErrorMessage, onSubmit } =
    useSignUpUser();

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
        <Title>{t('signUp.title')}</Title>
        <AuthForm keyPrefix="signUp" onSubmit={onSubmit} isLoadingAuth={isLoadingAuth} />
        <FormDescriptionWrapper>
          <FormDescriptionText>{t('other.or')}</FormDescriptionText>
        </FormDescriptionWrapper>
        <LinkWrapper>
          <StyledLink to="/signin">{t('signUp.account')}</StyledLink>
        </LinkWrapper>
      </FormWrapper>
      {isLoadingAuth && <Loader />}
      {signUpErrorMessage && (
        <PopupNotification
          isPopupShown={isErrorNotificationPopupOpen}
          setPopupShown={setErrorNotificationPopupOpen}
          text={t(`${signUpErrorMessage}`)}
          backgroundColor={defaultTheme.colors.pink}
        />
      )}
    </MainWrapper>
  );
}

export default memo(SignUpPage);
