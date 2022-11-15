import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/useRedux';

import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';
import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import { useSignInMutation } from 'redux/api/authApiSlice';

import AuthForm from 'components/AuthForm/AuthForm';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import PopupNotification from 'components/PopupNotification/PopupNotification';

import { UserFormValues } from 'ts/interfaces';
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

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation');
  const [
    signIn,
    {
      data: authData,
      originalArgs: userData,
      isSuccess: isSuccessSignIn,
      isLoading: isLoadingSignIn,
      isError: isErrorSignIn,
      error: signInErrorMessage,
    },
  ] = useSignInMutation();
  const [
    getUserById,
    { data: user, isSuccess: isSuccessGetUser, isFetching: isLoadingGetUser },
  ] = useLazyGetUserByIdQuery();
  const isLoadingAuth = isLoadingSignIn || isLoadingGetUser;

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(
    async ({ name, ...formValues }) => {
      await signIn(formValues);
    },
    []
  );

  const authUser = useCallback(async () => {
    if (authData && isSuccessSignIn) {
      dispatch(setAuthUser(authData));
      await getUserById(authData._id);
    }
  }, [isSuccessSignIn]);

  const addUser = useCallback(() => {
    if (user && userData && isSuccessGetUser) {
      dispatch(
        setUser({
          ...userData,
          name: user.name,
        })
      );
      dispatch(setLoggedIn(true));
    }
  }, [isSuccessGetUser]);

  useEffect(() => {
    addUser();
  }, [isSuccessGetUser]);

  useEffect(() => {
    authUser();
  }, [isSuccessSignIn]);

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
