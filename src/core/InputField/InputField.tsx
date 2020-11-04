import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { BaseInputProps } from './base';
import { useStyles } from './styles';

type Variant = 'primary' | 'error' | 'success' | undefined;

interface InputProps extends BaseInputProps {
  variant?: Variant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
const InputField: React.FC<InputProps> = ({
  variant,
  startIcon,
  endIcon,
  disabled,
  type,
  fullWidth,
  ...rest
}) => {
  const classes = useStyles({ fullWidth });
  // Hides or shows the password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function getVariant(variant: Variant): string {
    switch (variant) {
      case 'error':
        return classes.error;
      case 'success':
        return classes.success;
      default:
        return classes.primary;
    }
  }

  return (
    <TextField
      data-testid="inputField"
      variant="outlined"
      className={
        disabled
          ? `${classes.root}  ${classes.disabled}`
          : `${classes.root}  ${getVariant(variant)}`
      }
      type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
      error={variant === 'error'}
      disabled={disabled}
      InputProps={{
        endAdornment:
          type === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : (
            endIcon && (
              <InputAdornment position="end">
                <IconButton edge="end">{endIcon}</IconButton>
              </InputAdornment>
            )
          ),
        startAdornment: startIcon && (
          <InputAdornment position="start">
            <IconButton aria-label="password field icon" edge="start">
              {startIcon}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export { InputField };
