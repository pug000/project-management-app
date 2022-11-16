import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { getUser } from 'redux/selectors/userSelectors';
import { useSignInMutation } from 'redux/api/authApiSlice';
import { setAuthUser } from 'redux/slices/userSlice';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Loader from 'components/Loader/Loader';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage/SignInPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

function App() {
  const user = useAppSelector(getUser);
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
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route
              path="edit"
              element={
                <ProtectedRoute>
                  <main>Edit User</main>
                </ProtectedRoute>
              }
            />
            <Route
              path="projects"
              element={
                <ProtectedRoute>
                  <main>Projects</main>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
