import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { ProgressBarBaseProps } from './base';
import { useStyles } from './styles';

interface ProgressBarProps extends ProgressBarBaseProps {
  color: string;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  color,
  className,
  ...rest
}) => {
  const classes = useStyles({ color });
  return (
    <div className={className}>
      <label className={classes.label}>
        <span data-testid="label">{label}</span>
        <hr />
        <span data-testid="value" className={classes.value}>
          {value}
        </span>
      </label>
      <LinearProgress
        className={classes.root}
        variant="determinate"
        value={value}
        {...rest}
      />
    </div>
  );
};
export { ProgressBar };
