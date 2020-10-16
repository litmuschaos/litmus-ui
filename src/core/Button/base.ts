import { ButtonProps } from '@material-ui/core/Button';

export type ButtonBaseProps = Omit<ButtonProps, 'style' | 'variant' | 'color'>;
