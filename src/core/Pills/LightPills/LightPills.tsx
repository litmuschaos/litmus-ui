import { Chip } from "@material-ui/core";
import React from "react";
import { ChipBaseProps } from "../base";
import { useStyles } from "./style";

type Variant = "success" | "warning" | "danger" | undefined;

interface LightPillsProps extends ChipBaseProps {
  variant: Variant;
}
const LightPills: React.FC<LightPillsProps> = ({
  label,
  variant,
  className,
}) => {
  const classes = useStyles();
  const getVariant = (variant: Variant) => {
    switch (variant) {
      case "success":
        return classes.success;
      case "warning":
        return classes.warning;
      case "danger":
        return classes.danger;
      default:
        return "";
    }
  };
  return (
    <Chip
      label={label}
      className={`${classes.root} ${className} ${getVariant(variant)}`}
    />
  );
};
export { LightPills };
