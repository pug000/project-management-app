import theme from 'styles/theme';
import { Author, HeaderLinksProps } from 'ts/interfaces';

const baseUrl = 'https://project-management.up.railway.app/';

const authors: Author[] = [
  {
    id: 1,
    name: 'roma',
    githubLink: 'https://github.com/pug000',
    title: 'Roman on GitHub',
  },
  {
    id: 2,
    name: 'nastya',
    githubLink: 'https://github.com/saachko',
    title: 'Anastasiya on GitHub',
  },
  {
    id: 3,
    name: 'artem',
    githubLink: 'https://github.com/aArt13',
    title: 'Artsiom on GitHub',
  },
];

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

export { baseUrl, authors, headerSignItems, headerLinkItems };
