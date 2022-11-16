import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { backButtonAnimation } from 'utils/animations';

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

import useSignUpUser from 'hooks/useSignUpUser';

function SignUpPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const { isLoadingAuth, isErrorSignUp, signUpErrorMessage, onSubmit } = useSignUpUser();

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
          initialPopupState={isErrorSignUp}
          text={t(`${signUpErrorMessage}`)}
          backgroundColor={defaultTheme.colors.pink}
        />
      )}
    </MainWrapper>
  );
}

export default SignUpPage;
