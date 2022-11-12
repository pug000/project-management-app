import React, { Suspense, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { useSignInMutation } from 'redux/api/authSlice';
import { setAuthUser } from 'redux/slices/userSlice';

import AppLayout from 'components/AppLayout/AppLayout';
import HomePage from 'pages/HomePage/HomePage';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import SignUpPage from 'pages/SignUpPage/SignUpPage';

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [signIn, { data: authData, isSuccess: isSuccessSignIn }] = useSignInMutation();

  const authUser = useCallback(async () => {
    if (user) {
      const { name, ...data } = user;
      await signIn(data);
    }
  }, []);

  useEffect(() => {
    if (authData && isSuccessSignIn) {
      dispatch(setAuthUser(authData));
    }
  }, [authData]);

  useEffect(() => {
    authUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route path="signin" element={<div>SignIn</div>} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="board" element={<div>Board</div>} />
        <Route path="*" element={<div>NotFound</div>} />
      </Route>
    </Routes>
  );
}

export default App;
