import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { AiOutlineWarning } from 'react-icons/ai';

const NotFoundText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  text-align: center;

  @media (max-width: 500px) {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const NotFoundLink = styled(NavLink)`
  text-decoration: none;
  margin-top: 15px;
  text-align: center;
`;

const NotFoundIcon = styled(AiOutlineWarning)`
  transform: scale(3);
  margin-bottom: 20px;
`;

export { NotFoundText, NotFoundLink, NotFoundIcon };
