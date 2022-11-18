import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { getAuthUser, getLoggedIn } from 'redux/selectors/userSelectors';
import { setLoggedOut } from 'redux/slices/userSlice';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Loader from 'components/Loader/Loader';
import ProfilePage from 'pages/ProfilePage/ProfilePage';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage/SignInPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

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
        dispatch(setLoggedOut());
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
            <Route path="profile" element={<ProfilePage />} />
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
