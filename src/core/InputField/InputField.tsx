import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
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
  label,
  type,
  ...rest
}) => {
  const classes = useStyles();
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
    <FormControl
      data-testid="inputField"
      variant="outlined"
      className={
        disabled ? classes.disabled : `${classes.root}  ${getVariant(variant)}`
      }
    >
      <InputLabel
        htmlFor="outlined-adornment-password"
        className={disabled ? `MuiInputLabel-shrink MuiFormLabel-filled` : ``}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        role="OutlinedInput"
        type={
          type === 'text' || !type ? 'text' : showPassword ? 'text' : 'password'
        }
        error={variant === 'error' ? true : false}
        disabled={disabled}
        endAdornment={
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
          )
        }
        startAdornment={
          startIcon && (
            <InputAdornment position="start">
              <IconButton aria-label="password field icon" edge="start">
                {startIcon}
              </IconButton>
            </InputAdornment>
          )
        }
        labelWidth={70}
        {...rest}
      />
    </FormControl>
  );
};

export { InputField };
