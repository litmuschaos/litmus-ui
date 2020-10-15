import { Button } from '@material-ui/core';
import React from 'react';
import { ButtonBaseProps } from '../base';
import { useStyles } from './styles';

type Variant = 'default' | 'highlight' | undefined;

interface ButtonOutlinedProps extends ButtonBaseProps {
  variant?: Variant;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({
  variant,
  children,
  ...rest
}) => {
  // Styles
  const classes = useStyles();

  function getVariant(variant: Variant): string {
    switch (variant) {
      case 'highlight':
        return classes.highlight;
      default:
        return '';
    }
  }

  return (
    <Button
      variant="outlined"
      className={`${classes.root} ${getVariant(variant)}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export { ButtonOutlined };
