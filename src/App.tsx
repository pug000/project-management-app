import React, { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useCheckUserToken from 'hooks/useCheckUserToken';

import { setTokeInvalidPopupOpen } from 'redux/slices/userSlice';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Loader from 'components/Loader/Loader';
import PopupNotification from 'components/PopupNotification/PopupNotification';

import defaultTheme from 'styles/theme';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage/SignInPage'));
const ProjectsPage = lazy(() => import('pages/ProjectsPage/ProjectsPage'));
const ProjectPage = lazy(() => import('pages/ProjectPage/ProjectPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const EditProfilePage = lazy(() => import('pages/EditProfilePage/EditProfilePage'));

function App() {
  const { t } = useTranslation('translation');
  const { isTokenInvalidPopupOpen, tokenInvalidErrorMessage } = useCheckUserToken();
  const [isFooterShown, setFooterShown] = useState(true);

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
            <Route path="profile/edit" element={<EditProfilePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route
              path="projects/:id"
              element={<ProjectPage setFooterShown={setFooterShown} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      {tokenInvalidErrorMessage && (
        <PopupNotification
          isPopupShown={isTokenInvalidPopupOpen}
          setPopupShown={setTokeInvalidPopupOpen}
          backgroundColor={defaultTheme.colors.pink}
          text={t(`${tokenInvalidErrorMessage}`)}
        />
      )}
      {isFooterShown && <Footer />}
    </>
  );
}

export default App;
