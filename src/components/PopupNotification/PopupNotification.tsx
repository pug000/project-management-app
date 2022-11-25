import React, { memo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';

import Button from 'components/Button/Button';

import { notificationAnimation, progressBarAnimation } from 'utils/animations';

import { useAppDispatch } from 'hooks/useRedux';

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
  text?: string;
  isPopupShown: boolean;
  setPopupShown: ActionCreatorWithPayload<boolean>;
  backgroundColor?: string;
}

function PopupNotification({
  isPopupShown,
  setPopupShown,
  text,
  backgroundColor,
}: PopupNotificationProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isPopupShown) {
      setTimeout(() => {
        dispatch(setPopupShown(false));
      }, 3000);
    }
  }, [isPopupShown]);

  return (
    <AnimatePresence>
      {isPopupShown && (
        <PopupWrapper $variants={notificationAnimation}>
          <Popup $backgroundColor={backgroundColor}>
            <PopupText>{text}</PopupText>
            <ButtonWrapper>
              <Button
                type="button"
                width="30px"
                backgroundColor={defaultTheme.colors.transparent}
                callback={() => dispatch(setPopupShown(false))}
              >
                <CloseIcon />
              </Button>
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
