import { TypographyProps } from '@material-ui/core/Typography';

export type TypographyBaseProps = Omit<
  TypographyProps,
  'variant' | 'variantMapping' | 'color' | 'paragraph'
>;

export type Variant = 'bold' | 'small' | undefined;
