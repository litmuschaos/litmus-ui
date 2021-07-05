import { Chip } from "@material-ui/core";
import React from "react";
import { ChipBaseProps } from "../base";
import { useStyles } from "./style";
import SuccessIcon from "/public/assets/icons/workflowCompleted.svg";
import FailedIcon from "/public/assets/icons/workflowFailed.svg";
import PendingIcon from "/public/assets/icons/workflowPending.svg";
import RunningIcon from "/public/assets/icons/workflowRunning.svg";

type Variant = "succeeded" | "running" | "failed" | "pending" | undefined;

interface OutlinedPillsProps extends ChipBaseProps {
  label: string;
  variant: Variant;
}

const OutlinedPills: React.FC<OutlinedPillsProps> = ({
  label,
  className,
  variant,
  ...rest
}) => {
  // Styles
  const classes = useStyles();

  function getVariant(variant: Variant): string {
    switch (variant) {
      case "failed":
        return classes.failed;
      case "running":
        return classes.running;
      case "succeeded":
        return classes.succeeded;
      case "pending":
        return classes.pending;
      default:
        return "";
    }
  }
  function getIconVariant(variant: Variant): string {
    switch (variant) {
      case "failed":
        return FailedIcon;
      case "running":
        return RunningIcon;
      case "succeeded":
        return SuccessIcon;
      case "pending":
        return PendingIcon;
      default:
        return "";
    }
  }
  return (
    <Chip
      icon={<img src={getIconVariant(variant)} alt={variant} />}
      label={label}
      variant="outlined"
      className={`${classes.root} ${className} ${getVariant(variant)}`}
      {...rest}
    />
  );
};
export { OutlinedPills };
