import React, { memo } from 'react';

import useDeleteUser from 'hooks/useDeleteUser';

import PopupWarning from 'components/PopupWarning/PopupWarning';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Profile from 'components/Profile/Profile';
import Loader from 'components/Loader/Loader';

import { MainWrapper } from 'styles/styles';

import { profileIconsList } from 'utils/constants';

import { ImagesContainer, ImageWrapper, ProfileSection } from './ProfilePage.style';

function ProfilePage() {
  const {
    isLoadingDeleteUser,
    isDeletePopupOpen,
    deleteUserProfile,
    setDeletePopupOpen,
  } = useDeleteUser();

  return (
    <ProtectedRoute>
      <MainWrapper>
        <ProfileSection>
          <Profile />
          <ImagesContainer>
            {profileIconsList.map(({ icon, id }) => (
              <ImageWrapper key={id}>{icon}</ImageWrapper>
            ))}
          </ImagesContainer>
        </ProfileSection>
        {isLoadingDeleteUser && <Loader />}
        <PopupWarning
          isPopupShown={isDeletePopupOpen}
          setPopupShown={setDeletePopupOpen}
          actionOnYes={deleteUserProfile}
          text="deleteProfile"
        />
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProfilePage);
