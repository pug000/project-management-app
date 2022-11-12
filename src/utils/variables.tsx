import theme from 'styles/theme';
import { HeaderLinksProps } from '../ts/interfaces';

const headerSignItems: HeaderLinksProps[] = [
  {
    id: 1,
    text: 'signIn.text',
    link: '/signin',
    color: theme.colors.primaryColor,
    backgroundColor: theme.colors.backgroundWhite,
  },
  {
    id: 2,
    text: 'signUp.text',
    link: '/signup',
    color: theme.colors.textButton,
    backgroundColor: theme.colors.backgroundDarkBlue,
  },
];

const headerLinkItems: HeaderLinksProps[] = [
  {
    id: 1,
    text: 'home.text',
    link: '/',
  },
  {
    id: 2,
    text: 'board.text',
    link: '/board',
  },
];

export { headerSignItems, headerLinkItems };
