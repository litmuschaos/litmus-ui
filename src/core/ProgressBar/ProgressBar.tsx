import { LinearProgress } from "@material-ui/core";
import React from "react";
import { ProgressBarBaseProps } from "./base";
import { useStyles } from "./styles";

interface ProgressBarProps extends ProgressBarBaseProps {
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color,
  className,
  ...rest
}) => {
  const classes = useStyles({ color });
  return (
    <LinearProgress
      data-testid="linear-Progress"
      className={`${classes.root} ${className}`}
      variant="determinate"
      value={value}
      {...rest}
    />
  );
};
export { ProgressBar };
