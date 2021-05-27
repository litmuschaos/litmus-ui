import { Button } from "@material-ui/core";
import React from "react";
import { ButtonBaseProps } from "../base";
import { useStyles } from "./styles";

type Variant = "default" | "error" | "success" | undefined;

type Size = "large" | "medium" | "small" | undefined;

interface ButtonFilledProps extends ButtonBaseProps {
  variant?: Variant;
  size?: Size;
}

const ButtonFilled: React.FC<ButtonFilledProps> = ({
  variant,
  size,
  children,
  className,
  ...rest
}) => {
  // Styles
  const classes = useStyles();

  function getVariant(variant: Variant): string {
    switch (variant) {
      case "error":
        return classes.error;
      case "success":
        return classes.success;
      default:
        return "";
    }
  }

  function getVariantSize(size: Size): string {
    switch (size) {
      case "large":
        return classes.large;
      case "medium":
        return classes.medium;
      case "small":
        return classes.small;
      default:
        return "";
    }
  }

  return (
    <Button
      variant="contained"
      className={`${classes.root} ${className} ${getVariant(
        variant
      )} ${getVariantSize(size)}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export { ButtonFilled };
