import React, { useCallback } from 'react';
import i18n from 'localization/i18n';
import i18next from 'i18next';

import theme from 'styles/theme';

import Button from 'components/Button/Button';
import Icon from './IconElement/Icon';

import LangWrapper from './LangSwitcher.style';

function LangSwitcher() {
  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <LangWrapper>
      <Icon />
      <Button
        text={i18next.language === 'en' ? 'ru' : 'en'}
        type="button"
        width="20px"
        color={theme.colors.primaryColor}
        backgroundColor={theme.colors.backgroundWhite}
        callback={() => changeLanguage(i18next.language === 'en' ? 'ru' : 'en')}
      />
    </LangWrapper>
  );
}

export default LangSwitcher;
