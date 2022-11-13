import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { useSignInMutation } from 'redux/api/authApiSlice';
import { setAuthUser } from 'redux/slices/userSlice';

import HomePage from 'pages/HomePage/HomePage';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Header from 'components/Header/Header';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import SignInPage from 'pages/SignInPage/SignInPage';
import Footer from 'components/Footer/Footer';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [signIn, { data: authData, isSuccess: isSuccessSignIn }] = useSignInMutation();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

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
    <>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route
            path="edit"
            element={
              <ProtectedRoute conditionValue={isLoggedIn}>
                <main>Edit User</main>
              </ProtectedRoute>
            }
          />
          <Route
            path="board"
            element={
              <ProtectedRoute conditionValue={isLoggedIn}>
                <main>Board</main>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<main>NotFound</main>} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
