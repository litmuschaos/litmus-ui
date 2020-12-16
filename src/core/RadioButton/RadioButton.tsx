import { FormControlLabel, Radio } from '@material-ui/core';
import React from 'react';
import { RadioBaseProps } from './base';
import { useStyles } from './styles';

const RadioButton: React.FC<RadioBaseProps> = ({
  children,
  value,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      value={value}
      labelPlacement="end"
      label={children}
      className={`${classes.root} ${className}`}
      control={
        <Radio value={value} className={classes.styledRadio} {...rest} />
      }
    />
  );
};

export { RadioButton };
