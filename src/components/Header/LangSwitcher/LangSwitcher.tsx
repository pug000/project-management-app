import React, { useCallback } from 'react';
import i18n from 'localization/i18n';
import i18next from 'i18next';

import {
  LangWrapper,
  CheckboxContainer,
  InputCheckbox,
  CheckboxSwitcher,
} from './LangSwitcher.style';

function LangSwitcher() {
  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <LangWrapper>
      <CheckboxContainer>
        <InputCheckbox
          type="checkbox"
          onClick={() => changeLanguage(i18next.language === 'en' ? 'ru' : 'en')}
        />
        <CheckboxSwitcher />
      </CheckboxContainer>
    </LangWrapper>
  );
}

export default LangSwitcher;
