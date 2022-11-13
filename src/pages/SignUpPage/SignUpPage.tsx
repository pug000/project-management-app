import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/useRedux';

import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';
import { useSignInMutation, useSignUpMutation } from 'redux/api/authApiSlice';

import AuthForm from 'components/AuthForm/AuthForm';

import { UserFormValues } from 'ts/interfaces';

import {
  FormDescriptionWrapper,
  FormDescriptionText,
  FormWrapper,
  MainWrapper,
  StyledLink,
  Title,
} from 'styles/styles';

function SignUpPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation');
  const [
    signUp,
    { originalArgs: userData, isSuccess: isSuccessSignUp, isLoading: isLoadingSignUp },
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
        <Title>{t('signUp.title')}</Title>
        <AuthForm keyPrefix="signUp" onSubmit={onSubmit} isLoadingAuth={isLoadingAuth} />
        <FormDescriptionWrapper>
          <FormDescriptionText>{t('other.or')}</FormDescriptionText>
        </FormDescriptionWrapper>
        <StyledLink to="/signin">{t('signUp.account')}</StyledLink>
      </FormWrapper>
    </MainWrapper>
  );
}

export default SignUpPage;
