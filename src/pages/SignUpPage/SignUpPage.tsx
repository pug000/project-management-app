import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks/useRedux';

import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';
import { useSignInMutation, useSignUpMutation } from 'redux/api/authApiSlice';

import AuthForm from 'components/AuthForm/AuthForm';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

import { UserFormValues } from 'ts/interfaces';

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
import PopupNotification from 'components/PopupNotification/PopupNotification';
import { backButtonAnimation } from 'utils/constants';

function SignUpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const [
    signUp,
    {
      originalArgs: userData,
      isSuccess: isSuccessSignUp,
      isLoading: isLoadingSignUp,
      isError: isErrorSignUp,
      error: signUpErrorMessage,
    },
  ] = useSignUpMutation();
  const [
    signIn,
    { data: authData, isSuccess: isSuccessSignIn, isLoading: isLoadingSignIn },
  ] = useSignInMutation();
  const isLoadingAuth = isLoadingSignUp || isLoadingSignIn;

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(async (formValues) => {
    await signUp(formValues);
  }, []);

  const authUser = useCallback(async () => {
    if (userData && isSuccessSignUp) {
      const { name, ...data } = userData;
      await signIn(data);
    }
  }, [isSuccessSignUp]);

  useEffect(() => {
    authUser();
  }, [isSuccessSignUp]);

  useEffect(() => {
    if (authData && userData && isSuccessSignIn) {
      dispatch(setUser(userData));
      dispatch(setAuthUser(authData));
      dispatch(setLoggedIn(true));
    }
  }, [authData, userData, isSuccessSignIn]);

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
