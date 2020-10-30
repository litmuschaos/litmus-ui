import React from 'react';
import useStyles from './styles';
import Radio from '@material-ui/core/Radio';
import { RadioBaseProps } from './base';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RadioButton: React.FC<RadioBaseProps> = ({
  children,
  onChange,
  disabled,
  checked,
  value,
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      value={value}
      labelPlacement="end"
      label={children}
      className={classes.root}
      control={
        <Radio
          onChange={onChange}
          value={value}
          disabled={disabled}
          checked={checked}
          className={classes.styledRadio}
        />
      }
    />
  );
};

export default RadioButton;
