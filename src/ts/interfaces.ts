interface ColorProps {
  $color?: string;
}

interface BackgroundColorProps {
  $backgroundColor?: string;
}

interface WidthProps {
  $width?: string;
}

interface Author {
  id: number;
  name: string;
  githubLink: string;
  title: string;
}

export type { ColorProps, BackgroundColorProps, WidthProps, Author };
