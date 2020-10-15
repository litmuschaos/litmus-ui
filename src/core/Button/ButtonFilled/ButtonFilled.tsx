import { Button } from '@material-ui/core';
import React from 'react';
import { ButtonBaseProps } from '../base';
import { useStyles } from './styles';

type Variant = 'default' | 'error' | 'success' | undefined;

interface ButtonFilledProps extends ButtonBaseProps {
  variant?: Variant;
}

const ButtonFilled: React.FC<ButtonFilledProps> = ({
  variant,
  children,
  ...rest
}) => {
  // Styles
  const classes = useStyles();

  function getVariant(variant: Variant): string {
    switch (variant) {
      case 'error':
        return classes.error;
      case 'success':
        return classes.success;
      default:
        return '';
    }
  }

  return (
    <Button
      variant="contained"
      className={`${classes.root} ${getVariant(variant)} `}
      {...rest}
    >
      {children}
    </Button>
  );
};

export { ButtonFilled };
