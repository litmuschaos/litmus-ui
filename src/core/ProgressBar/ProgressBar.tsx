import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';

interface ProgressBarProps {
  value: number;
  color: string;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, color }) => {
  const classes = useStyles({ color });
  return (
    <div>
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
      />
    </div>
  );
};
export { ProgressBar };
