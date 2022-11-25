import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks/useRedux';

import { popupAnimation } from 'utils/animations';

import { EditFormValues } from 'ts/interfaces';

import defaultTheme from 'styles/theme';

import { MdClose } from 'react-icons/md';

import Button from 'components/Button/Button';
import EditForm from './EditForm/EditForm';

import {
  Background,
  Popup,
  PopupTitle,
  CloseButtonWrapper,
  PopupWrapper,
} from './PopupWithForm.style';

interface PopupWithFormProps<T> {
  isPopupShown: boolean;
  setPopupShown: ActionCreatorWithPayload<boolean>;
  keyPrefix: string;
  formTitleText: string;
  onSubmit: SubmitHandler<EditFormValues>;
  selectedItem?: T | null;
  setSelectedItem?: ActionCreatorWithPayload<T | null>;
}

function PopupWithForm<T>({
  isPopupShown,
  setPopupShown,
  keyPrefix,
  formTitleText,
  onSubmit,
  selectedItem,
  setSelectedItem,
}: PopupWithFormProps<T>) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix });

  const closePopup = useCallback(() => {
    dispatch(setPopupShown(false));
    if (selectedItem && setSelectedItem) {
      dispatch(setSelectedItem(null));
    }
  }, []);

  return (
    <AnimatePresence>
      {isPopupShown && (
        <PopupWrapper $variants={popupAnimation}>
          <Background onClick={closePopup} />
          <Popup>
            <PopupTitle>{t(`${formTitleText}`)}</PopupTitle>
            <EditForm
              keyPrefix={keyPrefix}
              onSubmit={onSubmit}
              selectedItem={selectedItem}
            />
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

PopupWithForm.defaultProps = {
  selectedItem: null,
  setSelectedItem: undefined,
};

export default PopupWithForm;
