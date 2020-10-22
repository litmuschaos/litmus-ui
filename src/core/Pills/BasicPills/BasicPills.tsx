import { Chip } from '@material-ui/core';
import React from 'react';
import { useStyles } from './style';
import { ChipBaseProps } from '../base';

type Variant = 'default' | 'selected';

interface PillsProps extends ChipBaseProps {
  variant: Variant;
  label: string;
}

const Pills: React.FC<PillsProps> = ({ variant, label }) => {
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
    <Chip label={label} className={`${classes.root} ${getVariant(variant)}`} />
  );
};
export { Pills };
