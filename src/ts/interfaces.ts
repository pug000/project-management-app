interface ColorProps {
  $color?: string;
}

interface BackgroundColorProps {
  $backgroundColor?: string;
}

interface WidthProps {
  $width?: string;
}

interface HeaderProps {
  $backgroundColor?: string;
}
interface HeaderSignLink {
  id: number;
  text: string;
  link: string;
  color: string;
  backgroundColor: string;
}

interface Author {
  id: number;
  name: string;
  githubLink: string;
  title: string;
}

export type {
  ColorProps,
  BackgroundColorProps,
  WidthProps,
  HeaderProps,
  HeaderSignLink,
  Author,
};
