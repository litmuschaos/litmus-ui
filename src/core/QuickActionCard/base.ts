export interface QuickActionCardProps {
  onClick?: () => void;
  src: string;
  alt: string;
  href?: string;
  text: string;
}

export interface QuickActionCardPropsArray {
  quickActions: QuickActionCardProps[];
  title?: string;
}
