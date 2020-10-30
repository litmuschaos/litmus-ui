import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import React from 'react';
import { RadioBaseProps } from './base';
import useStyles from './styles';

const RadioButton: React.FC<RadioBaseProps> = ({
  children,
  value,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      value={value}
      labelPlacement="end"
      label={children}
      className={classes.root}
      control={
        <Radio value={value} className={classes.styledRadio} {...rest} />
      }
    />
  );
};

export { RadioButton };
