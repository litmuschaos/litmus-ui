import React from 'react';
import { NavLink } from 'react-router-dom';
import { LinkBaseProps } from './base';
import { useStyles } from './styles';

interface LinkProps extends LinkBaseProps {
  disabled: boolean;
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  to,
  target,
  disabled,
  className,
  children,
}) => {
  const classes = useStyles();
  const disableLink = disabled ? classes.disabled : '';
  return (
    <NavLink
      className={`${classes.root} ${className} ${disableLink}`}
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
