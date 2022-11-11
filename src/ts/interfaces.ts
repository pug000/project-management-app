interface ColorProps {
  $color?: string;
}

interface BackgroundColorProps {
  $backgroundColor?: string;
}

interface WidthProps {
  $width?: string;
}

interface HeaderLink {
  id: number;
  text: string;
  link: string;
}

export type { ColorProps, BackgroundColorProps, WidthProps, HeaderLink };
