import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles';

interface ButtonHybridProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonHybrid: React.FC<ButtonHybridProps> = ({
  handleClick,
  children,
}) => {
  // Styles
  const classes = useStyles();
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Button
      variant="outlined"
      size="medium"
      onClick={() => {
        handleClick;
        setToggle(!toggle);
      }}
      className={`${classes.root} ${toggle ? classes.active : ''}`}
    >
      {children}
    </Button>
  );
};

export { ButtonHybrid };
