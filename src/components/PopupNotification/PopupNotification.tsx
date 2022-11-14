import React, { memo, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Button from 'components/Button/Button';

import { notificationAnimation } from 'utils/constants';

import defaultTheme from 'styles/theme';
import {
  ButtonWrapper,
  CloseIcon,
  Popup,
  PopupText,
  PopupWrapper,
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
  const [isPopupOpen, setPopup] = useState(initialPopupState);

  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        setPopup(false);
      }, 3000);
    }
  }, [isPopupOpen]);

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <PopupWrapper $variants={notificationAnimation}>
          <Popup $backgroundColor={backgroundColor}>
            <PopupText>{text}</PopupText>
            <ButtonWrapper>
              <Button
                type="button"
                leftIcon={<CloseIcon />}
                width="30px"
                backgroundColor={defaultTheme.colors.transparent}
                callback={() => setPopup(false)}
              />
            </ButtonWrapper>
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
