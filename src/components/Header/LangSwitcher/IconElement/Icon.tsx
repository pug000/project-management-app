import React, { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { BiWorld } from 'react-icons/bi';

import theme from 'styles/theme';

function Icon() {
  const IconContextProviderValue = useMemo(
    () => ({ color: theme.colors.primaryColor, size: theme.fontSizes.h4 }),
    []
  );

  return (
    <IconContext.Provider value={IconContextProviderValue}>
      <div>
        <BiWorld />
      </div>
    </IconContext.Provider>
  );
}

export default Icon;
