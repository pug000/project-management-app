import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

import { warningAnimation } from 'utils/animations';

import defaultTheme from 'styles/theme';

import Button from 'components/Button/Button';

import { MdClose } from 'react-icons/md';

import {
  Background,
  Popup,
  PopupText,
  PopupButtons,
  CloseButtonWrapper,
} from './PopupWarning.style';

interface PopupWarningProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  actionOnYes: React.Dispatch<React.SetStateAction<boolean>>;
}

function PopupWarning({ setActive, text, actionOnYes }: PopupWarningProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'warningPopup' });

  return (
    <Background onClick={() => setActive(false)}>
      <AnimatePresence>
        <Popup $variants={warningAnimation}>
          <PopupText>{t(text)}</PopupText>
          <PopupButtons>
            <Button
              type="button"
              width="60px"
              color={defaultTheme.colors.text}
              backgroundColor={defaultTheme.colors.backgroundGrey}
              text={t('yes')}
              callback={() => actionOnYes(true)}
            />
            <Button
              type="button"
              width="60px"
              color={defaultTheme.colors.text}
              backgroundColor={defaultTheme.colors.backgroundGrey}
              text={t('no')}
              callback={() => setActive(false)}
            />
          </PopupButtons>
          <CloseButtonWrapper>
            <Button
              type="button"
              leftIcon={<MdClose />}
              width="30px"
              backgroundColor={defaultTheme.colors.transparent}
              callback={() => setActive(false)}
            />
          </CloseButtonWrapper>
        </Popup>
      </AnimatePresence>
    </Background>
  );
}

export default PopupWarning;
