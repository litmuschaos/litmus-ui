import React from 'react';
import { useStyles } from './styles';
import { TypographyBaseProps } from '../base';
import Typography from '@material-ui/core/Typography';

type Variant = 'bold' | undefined;

interface HeaderProps extends TypographyBaseProps {
  variant?: Variant;
  color?: string;
}

const Header: React.FC<HeaderProps> = ({ color, variant, children }) => {
  const classes = useStyles({ color });

  function getVariant(variant: Variant): string {
    switch (variant) {
      case 'bold':
        return classes.bold;
      default:
        return classes.primary;
    }
  }

  return (
    <Typography className={`${classes.root} ${getVariant(variant)}`}>
      {children}
    </Typography>
  );
};

export { Header };
