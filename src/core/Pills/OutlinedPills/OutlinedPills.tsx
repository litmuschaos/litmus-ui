import { Chip, useTheme } from "@material-ui/core";
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
  const theme = useTheme();

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
  function getIconColor(variant: Variant): string {
    switch (variant) {
      case "failed":
        return theme.palette.status.workflow.failed;
      case "running":
        return theme.palette.status.workflow.running;
      case "succeeded":
        return theme.palette.status.workflow.completed;
      case "pending":
        return theme.palette.status.workflow.pending;
      default:
        return theme.palette.status.workflow.pending;
    }
  }
  const classes = useStyles({ color: getIconColor(variant) });

  return (
    <Chip
      icon={
        <Icon name={getIconVariant(variant)} color={getIconColor(variant)} />
      }
      label={label}
      variant="outlined"
      className={`${classes.root} ${classes.variant} ${className}`}
      {...rest}
    />
  );
};
export { OutlinedPills };
