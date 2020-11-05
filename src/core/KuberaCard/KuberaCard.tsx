import React from 'react';
import { useStyles } from './styles';

interface KuberaCardProps {
  glow?: boolean;
  borderColor: string;
  width: string;
  height: string;
}

const KuberaCard: React.FC<KuberaCardProps> = ({
  glow,
  borderColor,
  width,
  height,
  children,
}) => {
  const classes = useStyles({ glow, borderColor, width, height });
  return <div className={classes.root}>{children}</div>;
};

export { KuberaCard };
