import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

import { backButtonAnimation } from 'utils/animations';

import useSignInUser from 'hooks/useSignInUser';

function SignInPage() {
  const { isLoadingAuth, isErrorSignIn, signInErrorMessage, onSubmit } = useSignInUser();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  return (
    <MainWrapper>
      <FormWrapper>
        <FormHeader>
          <Button
            type="button"
            leftIcon={<StyledPrevIcon $isDisabled={isLoadingAuth} />}
            width="30px"
            animation={backButtonAnimation}
            backgroundColor={defaultTheme.colors.transparent}
            disabled={isLoadingAuth}
            callback={() => navigate(-1)}
          />
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
          initialPopupState={isErrorSignIn}
          text={t(`${signInErrorMessage}`)}
          backgroundColor={defaultTheme.colors.pink}
        />
      )}
    </MainWrapper>
  );
}

export default SignInPage;
