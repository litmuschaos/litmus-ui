import { Chip } from "@material-ui/core";
import React from "react";
import { Icon, IconName } from "../../Icon";
import { ChipBaseProps } from "../base";
import { useStyles } from "./style";

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
  function getIconVariant(variant: Variant): IconName {
    switch (variant) {
      case "failed":
        return "workflowFailed";
      case "running":
        return "workflowRunning";
      case "succeeded":
        return "workflowCompleted";
      case "pending":
        return "workflowPending";
      default:
        return "workflowPending";
    }
  }
  return (
    <Chip
      icon={<Icon name={getIconVariant(variant)} />}
      label={label}
      variant="outlined"
      className={`${classes.root} ${className} ${getVariant(variant)}`}
      {...rest}
    />
  );
};
export { OutlinedPills };
