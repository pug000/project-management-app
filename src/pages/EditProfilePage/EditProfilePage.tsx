import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { backButtonAnimation } from 'utils/animations';

import Button from 'components/Button/Button';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import AuthForm from 'components/AuthForm/AuthForm';
import Loader from 'components/Loader/Loader';
import PopupNotification from 'components/PopupNotification/PopupNotification';

import defaultTheme from 'styles/theme';
import {
  FormDescriptionText,
  FormDescriptionWrapper,
  FormHeader,
  FormWrapper,
  LinkWrapper,
  MainWrapper,
  StyledLink,
  StyledPrevIcon,
  Title,
} from 'styles/styles';

function EditProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  return (
    <ProtectedRoute>
      <MainWrapper>
        <FormWrapper>
          <FormHeader>
            <Button
              type="button"
              width="30px"
              animation={backButtonAnimation}
              backgroundColor={defaultTheme.colors.transparent}
              disabled={false}
              callback={() => navigate(-1)}
            >
              <StyledPrevIcon $isDisabled={false} />
            </Button>
          </FormHeader>
          <Title>{t('profile.edit')}</Title>
          <AuthForm keyPrefix="profile" onSubmit={() => {}} isLoadingAuth={false} />
          <FormDescriptionWrapper>
            <FormDescriptionText>{t('other.or')}</FormDescriptionText>
          </FormDescriptionWrapper>
          <LinkWrapper>
            <StyledLink to="/profile">{t('profile.back')}</StyledLink>
          </LinkWrapper>
        </FormWrapper>
        {false && <Loader />}
        {false && (
          <PopupNotification
            text={t('profile.successful')}
            backgroundColor={defaultTheme.colors.pink}
          />
        )}
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(EditProfilePage);
