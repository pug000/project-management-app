import React from 'react';
import AuthForm from 'components/AuthForm/AuthForm';

function SignInPage() {
  return <AuthForm keyPrefix="signIn" onSubmit={() => {}} isLoadingAuth={false} />;
}

export default SignInPage;
