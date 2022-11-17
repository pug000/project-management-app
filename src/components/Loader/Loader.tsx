import React from 'react';

import { loadAnimation } from 'utils/animations';

import { Background, StyledLoader } from './Loader.style';

function Loader() {
  return (
    <Background>
      <StyledLoader $variants={loadAnimation} />
    </Background>
  );
}

export default Loader;
