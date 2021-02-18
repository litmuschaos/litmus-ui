import React from "react";
import { useStyles } from "./styles";

interface LitmusCardProps {
  glow?: boolean;
  borderColor: string;
  width: string;
  height: string;
  className?: string;
}

const LitmusCard: React.FC<LitmusCardProps> = ({
  glow,
  borderColor,
  width,
  height,
  className,
  children,
}) => {
  const classes = useStyles({ glow, borderColor, width, height });
  return <div className={`${classes.root} ${className}`}>{children}</div>;
};

export { LitmusCard };
