import React from 'react';
import { useStyles } from './styles';
import { TypographyBaseProps } from '../base';
import Typography from '@material-ui/core/Typography';

type Variant = 'small' | undefined;

interface ParagraphProps extends TypographyBaseProps {
  variant?: Variant;
  color?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ color, variant, children }) => {
  const classes = useStyles({ color });

  function getVarinat(variant: Variant): string {
    switch (variant) {
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
