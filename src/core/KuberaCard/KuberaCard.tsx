import React from 'react';
import useStyles from './styles';

interface KuberaCardProps {
  glow: boolean;
  width: string;
  height: string;
}

const KuberaCard: React.FC<KuberaCardProps> = ({
  glow,
  width,
  height,
  children,
}) => {
  const classes = useStyles({ glow, width, height });
  return <div className={classes.root}>{children}</div>;
};

export { KuberaCard };
