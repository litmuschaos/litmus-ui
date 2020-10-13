import { Button } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

interface ButtonOutlinedProps {
  isDefault?: boolean;
  isDisabled?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  styles?: Object;
  children?: React.ReactNode;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({
  isDefault,
  isDisabled,
  handleClick,
  styles,
  children,
}) => {
  // Component
  if (isDisabled === undefined) isDisabled = false;
  if (isDefault === undefined) isDefault = true;

  // Styles
  const classes = useStyles(isDefault);

  return (
    <Button
      style={styles}
      variant="outlined"
      size="medium"
      disabled={isDisabled}
      onClick={handleClick}
      className={`${classes.buttonOutline} ${classes.border}`}
    >
      {isDisabled ? (
        <div className={`${classes.valueField} ${classes.disabled}`}>
          {children}
        </div>
      ) : (
        <div className={`${classes.valueField} ${classes.text}`}>
          {children}
        </div>
      )}
    </Button>
  );
};

export { ButtonOutlined };
