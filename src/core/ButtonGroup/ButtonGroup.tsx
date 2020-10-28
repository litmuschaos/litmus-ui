import React from 'react';
import { Typography } from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons';
import { ButtonFilled } from '../Button/ButtonFilled';
import { ButtonGroupBaseProps } from './base';
import { useStyles } from './styles';

type Variant = 'default' | 'error' | 'success' | undefined;

interface ButtonGroupProps extends ButtonGroupBaseProps {
  variant?: Variant;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ variant }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="switch">
      {/* Pass Button */}
      <ButtonFilled
        aria-label="left aligned"
        variant={variant}
        disabled={variant === 'default' || variant === 'error'}
      >
        <CheckCircle />
        <Typography className={classes.typography}>Pass</Typography>
      </ButtonFilled>

      {/* Failed Button */}
      <ButtonFilled
        aria-label="left aligned"
        variant={variant}
        disabled={variant === 'default' || variant === 'success'}
      >
        <Cancel />
        <Typography className={classes.typography}>Fail</Typography>
      </ButtonFilled>
    </div>
  );
};

export { ButtonGroup };
