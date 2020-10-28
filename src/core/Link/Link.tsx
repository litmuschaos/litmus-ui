import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles } from './styles';
import { LinkBaseProps } from './base';

interface LinkProps extends LinkBaseProps {
  disabled: boolean;
}

const Link: React.FC<LinkProps> = ({ to, target, children, disabled }) => {
  const classes = useStyles();
  const disableLink = disabled ? classes.disabled : '';
  return (
    <NavLink
      className={`${classes.root} ${disableLink}`}
      to={to}
      target={target}
      rel="noreferrer noopener"
      role="navlink"
    >
      {children}
    </NavLink>
  );
};
export { Link };
