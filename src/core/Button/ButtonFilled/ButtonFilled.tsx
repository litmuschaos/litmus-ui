import { Button } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

interface ButtonFilledProps {
  variant?: 'default' | 'error' | 'success';
  disabled?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonFilled: React.FC<ButtonFilledProps> = ({
  variant,
  disabled,
  handleClick,
  children,
}) => {
  // Styles
  const classes = useStyles();

  function getVariant(type: typeof variant): string {
    switch (type) {
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
      size="medium"
      disabled={disabled}
      onClick={handleClick}
      className={`${classes.root} ${getVariant(variant)} `}
    >
      {children}
    </Button>
  );
};

export { ButtonFilled };
