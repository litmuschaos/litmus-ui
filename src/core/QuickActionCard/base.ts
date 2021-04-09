export interface QuickActionCardProps {
  onClick?: () => void;
  src: string;
  alt: string;
  text: string;
}

interface QuickActionCardPropsArray {
  className?: string;
  quickActions: QuickActionCardProps[];
  title?: string;
}
