import { Typography } from '@material-ui/core';
import React from 'react';
import { TypographyBaseProps, Variant } from '../base';
import { useStyles } from './styles';

interface SubtitleProps extends TypographyBaseProps {
  variant?: Variant;
  color?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({
  color,
  variant,
  children,
  ...rest
}) => {
  const classes = useStyles({ color });

  function getVariant(variant: Variant): string {
    switch (variant) {
      case 'bold':
        return classes.bold;
      case 'small':
        return classes.small;
      default:
        return classes.primary;
    }
  }

  return (
    <Typography className={`${classes.root} ${getVariant(variant)}`} {...rest}>
      {children}
    </Typography>
  );
};

export { Subtitle };
