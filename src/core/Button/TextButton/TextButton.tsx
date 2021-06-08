import { Button } from "@material-ui/core";
import React from "react";
import { ButtonBaseProps } from "../base";
import { useStyles } from "./styles";

type Variant = "highlight" | "success" | "error" | undefined;

type Size = "large" | "medium" | "small" | undefined;

interface TextButtonProps extends ButtonBaseProps {
  variant?: Variant;
  size?: Size;
}

const TextButton: React.FC<TextButtonProps> = ({
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
      case "success":
        return classes.success;
      case "error":
        return classes.error;
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
      data-testid="textButton"
      className={`${classes.root} ${className} ${getVariant(
        variant
      )} ${getVariantSize(size)}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export { TextButton };
