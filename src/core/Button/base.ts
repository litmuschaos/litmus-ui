import { ButtonProps } from '@material-ui/core/Button';

type ButtonBaseProps = Omit<ButtonProps, 'style' | 'variant' | 'color'>;

export { ButtonBaseProps };
