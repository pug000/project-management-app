import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useRedux';

import { getDeletePopupOpen } from 'redux/selectors/popupSelectors';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';

import PopupWarning from 'components/PopupWarning/PopupWarning';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Profile from 'components/Profile/Profile';

import { MainWrapper } from 'styles/styles';

import { profileIconsList } from 'utils/constants';

import { ImagesContainer, ImageWrapper, ProfileSection } from './ProfilePage.style';

function ProfilePage() {
  const isDeletePopupOpen = useAppSelector(getDeletePopupOpen);
  const navigate = useNavigate();

  const deleteUserProfile = useCallback(() => {
    navigate('/');
  }, []);

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
