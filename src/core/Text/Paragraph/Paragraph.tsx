import { Typography } from '@material-ui/core';
import React from 'react';
import { TypographyBaseProps, Variant } from '../base';
import { useStyles } from './styles';

interface ParagraphProps extends TypographyBaseProps {
  variant?: Variant;
  color?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ color, variant, children }) => {
  const classes = useStyles({ color });

  function getVarinat(variant: Variant): string {
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
    <Typography className={`${classes.root} ${getVarinat(variant)}`}>
      {children}
    </Typography>
  );
};

export { Paragraph };
