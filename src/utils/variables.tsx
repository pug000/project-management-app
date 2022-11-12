import theme from 'styles/theme';
import { HeaderSignLink } from '../ts/interfaces';

const headerSignItems: HeaderSignLink[] = [
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

export default headerSignItems;
