import { Typography as MuiTypography } from "@material-ui/core";
import React from "react";
import {
  FontColor,
  FontStyle,
  FontWeight,
  TypographyBaseProps,
  Variant,
} from "./base";
import { useStyles } from "./styles";

interface TypographyProps extends TypographyBaseProps {
  variant?: Variant;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  color?: FontColor;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  fontWeight = "regular",
  fontStyle = "normal",
  color = "primary",
  children,
  className,
  ...rest
}) => {
  const classes = useStyles({ color });

  return (
    <MuiTypography
      className={`${classes.root} ${classes[variant]} ${classes[fontWeight]} ${classes[fontStyle]} ${className}`}
      data-testid="typography"
      {...rest}
    >
      {children}
    </MuiTypography>
  );
};

export { Typography };
