import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';

import { useAppDispatch } from 'hooks/useRedux';

import { popupAnimation } from 'utils/animations';

import defaultTheme from 'styles/theme';

import Button from 'components/Button/Button';

import { MdClose } from 'react-icons/md';

import {
  Background,
  Popup,
  CloseButtonWrapper,
  PopupWrapper,
} from './PopupWithForm.style';

interface PopupWithFormProps {
  isPopupShown: boolean;
  setPopupShown: ActionCreatorWithPayload<boolean>;
}

function PopupWithForm({ isPopupShown, setPopupShown }: PopupWithFormProps) {
  const dispatch = useAppDispatch();

  const closePopup = useCallback(() => {
    dispatch(setPopupShown(false));
  }, []);

  return (
    <AnimatePresence>
      {isPopupShown && (
        <PopupWrapper $variants={popupAnimation}>
          <Background onClick={closePopup} />
          <Popup>
            <CloseButtonWrapper>
              <Button
                type="button"
                width="30px"
                backgroundColor={defaultTheme.colors.transparent}
                callback={closePopup}
              >
                <MdClose />
              </Button>
            </CloseButtonWrapper>
          </Popup>
        </PopupWrapper>
      )}
    </AnimatePresence>
  );
}

export default PopupWithForm;
