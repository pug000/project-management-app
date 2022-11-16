import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

import { warningAnimation } from 'utils/animations';

import defaultTheme from 'styles/theme';

import Button from 'components/Button/Button';

import { MdClose } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { getWarningPopupOpen } from 'redux/selectors/popupSelectors';
import { setIsWarningPopupOpen } from 'redux/slices/popupSlice';

import {
  Background,
  Popup,
  PopupText,
  PopupButtons,
  CloseButtonWrapper,
} from './PopupWarning.style';

interface PopupWarningProps {
  text: string;
  actionOnYes: () => void;
}

function PopupWarning({ text, actionOnYes }: PopupWarningProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'warningPopup' });
  const isWarningPopupOpen = useAppSelector(getWarningPopupOpen);
  const dispatch = useAppDispatch();

  const closePopup = () => {
    dispatch(setIsWarningPopupOpen(false));
  };

  return (
    <AnimatePresence>
      {isWarningPopupOpen && (
        <Background $variants={warningAnimation} onClick={closePopup}>
          <Popup>
            <PopupText>{t(text)}</PopupText>
            <PopupButtons>
              <Button
                type="button"
                width="60px"
                color={defaultTheme.colors.text}
                backgroundColor={defaultTheme.colors.backgroundGrey}
                text={t('yes')}
                callback={actionOnYes}
              />
              <Button
                type="button"
                width="60px"
                color={defaultTheme.colors.text}
                backgroundColor={defaultTheme.colors.backgroundGrey}
                text={t('no')}
                callback={closePopup}
              />
            </PopupButtons>
            <CloseButtonWrapper>
              <Button
                type="button"
                leftIcon={<MdClose />}
                width="30px"
                backgroundColor={defaultTheme.colors.transparent}
                callback={closePopup}
              />
            </CloseButtonWrapper>
          </Popup>
        </Background>
      )}
    </AnimatePresence>
  );
}

export default PopupWarning;
