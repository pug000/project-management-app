import React, { useCallback, useEffect } from 'react';

import { useAppSelector } from 'hooks/useRedux';

import AuthForm from 'components/AuthForm/AuthForm';

import { useSignUpMutation } from 'redux/api/userApi';

function SignUp() {
  const user = useAppSelector((state) => state.user.user);
  const [triggerSignUp] = useSignUpMutation();

  const signUpUser = useCallback(async () => {
    if (user) {
      await triggerSignUp(user);
    }
  }, [user]);

  useEffect(() => {
    signUpUser();
  }, [user]);

  return <AuthForm keyPrefix="signUp" />;
}

export default SignUp;
