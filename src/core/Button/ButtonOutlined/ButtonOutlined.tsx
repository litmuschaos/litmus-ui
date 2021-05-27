import { Button } from "@material-ui/core";
import React from "react";
import { ButtonBaseProps } from "../base";
import { useStyles } from "./styles";

type Variant = "default" | "highlight" | undefined;

type Size = "large" | "medium" | "small" | undefined;

interface ButtonOutlinedProps extends ButtonBaseProps {
  variant?: Variant;
  size?: Size;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({
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
      case "highlight":
        return classes.highlight;
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
      variant="outlined"
      className={`${classes.root} ${className} ${getVariant(
        variant
      )} ${getVariantSize(size)}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export { ButtonOutlined };
