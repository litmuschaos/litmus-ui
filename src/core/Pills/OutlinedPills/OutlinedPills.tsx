import { Chip } from '@material-ui/core';
import React from 'react';
import { ChipBaseProps } from '../base';
import { useStyles } from './style';

interface OutlinedPillsProps extends ChipBaseProps {
  label: string;
}

const OutlinedPills: React.FC<OutlinedPillsProps> = ({ label, className }) => {
  const classes = useStyles();

  return <Chip label={label} className={`${classes.root} ${className}`} />;
};
export { OutlinedPills };
