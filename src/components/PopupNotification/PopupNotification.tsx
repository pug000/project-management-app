import React, { memo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Button from 'components/Button/Button';

import { notificationAnimation, progressBarAnimation } from 'utils/animations';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { getNotificationPopupOpen } from 'redux/selectors/popupSelectors';
import { setIsNotificationPopupOpen } from 'redux/slices/popupSlice';

import defaultTheme from 'styles/theme';
import {
  ButtonWrapper,
  CloseIcon,
  Popup,
  PopupText,
  PopupWrapper,
  Progress,
  ProgressBar,
} from './PopupNotification.style';

interface PopupNotificationProps {
  initialPopupState: boolean;
  text?: string;
  backgroundColor?: string;
}

function PopupNotification({
  initialPopupState,
  text,
  backgroundColor,
}: PopupNotificationProps) {
  const isNotificationPopupOpen = useAppSelector(getNotificationPopupOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsNotificationPopupOpen(initialPopupState));
  }, []);

  useEffect(() => {
    if (isNotificationPopupOpen) {
      setTimeout(() => {
        dispatch(setIsNotificationPopupOpen(false));
      }, 3000);
    }
  }, [isNotificationPopupOpen]);

  return (
    <AnimatePresence>
      {isNotificationPopupOpen && (
        <PopupWrapper $variants={notificationAnimation}>
          <Popup $backgroundColor={backgroundColor}>
            <PopupText>{text}</PopupText>
            <ButtonWrapper>
              <Button
                type="button"
                leftIcon={<CloseIcon />}
                width="30px"
                backgroundColor={defaultTheme.colors.transparent}
                callback={() => dispatch(setIsNotificationPopupOpen(false))}
              />
            </ButtonWrapper>
            <ProgressBar>
              <Progress $variants={progressBarAnimation} />
            </ProgressBar>
          </Popup>
        </PopupWrapper>
      )}
    </AnimatePresence>
  );
}

PopupNotification.defaultProps = {
  backgroundColor: undefined,
  text: '',
};

export default memo(PopupNotification);
