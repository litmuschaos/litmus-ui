import React from 'react';
import { useStyles } from './styles';
import { TypographyBaseProps } from '../base';
import Typography from '@material-ui/core/Typography';

type Variant = 'small' | undefined;

interface SubtitleProps extends TypographyBaseProps {
  variant?: Variant;
  color?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ color, variant, children }) => {
  const classes = useStyles({ color });

  function getVariant(variant: Variant): string {
    switch (variant) {
      case 'small':
        return classes.small;
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

export { Subtitle };
