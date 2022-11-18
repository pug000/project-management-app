import React from 'react';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Profile from 'components/Profile/Profile';

import { MainWrapper } from 'styles/styles';

import { profileIconsList } from 'utils/constants';

import { ImagesContainer, ImageWrapper, ProfileSection } from './ProfilePage.style';

function ProfilePage() {
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
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default ProfilePage;
