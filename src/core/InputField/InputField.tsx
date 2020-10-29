import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { BaseInputProps } from './base';
import { useStyles } from './styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

type Variant = 'primary' | 'error' | 'success' | undefined;

interface InputProps extends BaseInputProps {
  variant?: Variant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
const InputField: React.FC<InputProps> = ({
  variant,
  label,
  disabled,
  type,
  value,
  required,
  startIcon,
  endIcon,
  onChange,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword(false);
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
  if (type === 'password') {
    return (
      <FormControl
        data-testid="inputField"
        variant="outlined"
        className={
          disabled
            ? classes.disabled
            : `${classes.root}  ${getVariant(variant)}`
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
          type={showPassword ? 'text' : 'password'}
          value={value}
          error={variant === 'error' ? true : false}
          disabled={disabled}
          onChange={onChange}
          required={required}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          startAdornment={
            startIcon ? (
              <InputAdornment position="start">
                <IconButton aria-label="password field icon" edge="start">
                  {startIcon}
                </IconButton>
              </InputAdornment>
            ) : (
              ''
            )
          }
          labelWidth={70}
        />
      </FormControl>
    );
  } else {
    return (
      <FormControl
        data-testid="inputField"
        variant="outlined"
        className={
          disabled
            ? classes.disabled
            : `${classes.root}  ${getVariant(variant)}`
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
          type={type}
          value={value}
          error={variant === 'error' ? true : false}
          disabled={disabled}
          onChange={onChange}
          required={required}
          startAdornment={
            startIcon ? (
              <InputAdornment position="start">
                <IconButton edge="start">{startIcon}</IconButton>
              </InputAdornment>
            ) : (
              ''
            )
          }
          endAdornment={
            endIcon ? (
              <InputAdornment position="end">
                <IconButton edge="end">{endIcon}</IconButton>
              </InputAdornment>
            ) : (
              ''
            )
          }
          labelWidth={70}
        />
      </FormControl>
    );
  }
};

export { InputField };
