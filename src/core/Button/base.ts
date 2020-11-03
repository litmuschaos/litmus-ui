import { ButtonProps } from '@material-ui/core/Button';

export type ButtonBaseProps = Omit<ButtonProps, 'variant' | 'color'>;
