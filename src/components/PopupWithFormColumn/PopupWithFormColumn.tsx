import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks/useRedux';

import { popupAnimation } from 'utils/animations';

import { ColumnFormValues } from 'ts/interfaces';

import defaultTheme from 'styles/theme';

import { MdClose } from 'react-icons/md';

import Button from 'components/Button/Button';
import EditFormColumn from './EditFormColumn/EditFormColumn';

import {
  Background,
  Popup,
  PopupTitle,
  CloseButtonWrapper,
  PopupWrapper,
} from './PopupWithFormColumn.style';

interface PopupWithFormProps {
  isPopupShown: boolean;
  setPopupShown: ActionCreatorWithPayload<boolean>;
  keyPrefix: string;
  title: string;
  onSubmit: SubmitHandler<ColumnFormValues>;
}

function PopupWithFormColumnTask({
  isPopupShown,
  setPopupShown,
  keyPrefix,
  title,
  onSubmit,
}: PopupWithFormProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix });

  const closePopup = useCallback(() => {
    dispatch(setPopupShown(false));
  }, []);

  return (
    <AnimatePresence>
      {isPopupShown && (
        <PopupWrapper $variants={popupAnimation}>
          <Background onClick={closePopup} />
          <Popup>
            <PopupTitle>{t(`${title}`)}</PopupTitle>
            <EditFormColumn keyPrefix={keyPrefix} onSubmit={onSubmit} />
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

export default PopupWithFormColumnTask;
