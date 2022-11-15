import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { getAuthUser, getLoggedIn } from 'redux/selectors/userSelectors';
import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Loader from 'components/Loader/Loader';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage/SignInPage'));

function App() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const authUser = useAppSelector(getAuthUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOutUser = useCallback(async () => {
    if (isLoggedIn && authUser?.exp) {
      const currentDate = new Date();
      const signOutDate = new Date(authUser.exp * 1000);

      if (currentDate >= signOutDate) {
        dispatch(setUser(null));
        dispatch(setAuthUser(null));
        dispatch(setLoggedIn(false));
        navigate('/');
      }
    }
  }, []);

  useEffect(() => {
    signOutUser();
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
            <Route path="*" element={<main>NotFound</main>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
