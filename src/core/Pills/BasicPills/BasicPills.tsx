import { Chip } from '@material-ui/core';
import React from 'react';
import { ChipBaseProps } from '../base';
import { useStyles } from './style';

type Variant = 'default' | 'selected';

interface PillsProps extends ChipBaseProps {
  variant: Variant;
  label: string;
}

const Pills: React.FC<PillsProps> = ({ variant, label, className }) => {
  const classes = useStyles();
  const getVariant = (variant: Variant) => {
    switch (variant) {
      case 'selected':
        return classes.active;
      default:
        return '';
    }
  };
  return (
    <Chip
      label={label}
      className={`${classes.root} ${className} ${getVariant(variant)}`}
    />
  );
};
export { Pills };
