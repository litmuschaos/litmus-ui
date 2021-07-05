import SVG from "@leeoniya/react-inlinesvg";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { IconName, IconSize } from "./base";

const iconRoot = "/assets/icons/";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName;
  size?: IconSize;
}
/* Transform string with px to number and add 2 pxs as path in svg is 2px smaller */
export const getSvgSize = (size: IconSize) => {
  switch (size) {
    case "xs":
      return 12;
    case "sm":
      return 14;
    case "md":
      return 16;
    case "lg":
      return 18;
    case "xl":
      return 24;
    case "xxl":
      return 36;
    case "xxxl":
      return 48;
  }
};

const useStyles = makeStyles(() => ({
  container: {
    display: "inline-block",
  },
  icon: {
    verticalAlign: "middle",
    display: "inline-block",
  },
}));

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ size = "md", name, className, style, ...divElementProps }, ref) => {
    const classes = useStyles();
    const svgSize = getSvgSize(size);
    const iconPath = `${iconRoot}${name}.svg`;
    console.log("path", iconPath);
    return (
      <div className={classes.container} {...divElementProps} ref={ref}>
        <SVG
          src={iconPath}
          width={svgSize}
          height={svgSize}
          className={`${classes.icon}
            ${className}`}
          style={style}
        />
      </div>
    );
  }
);

Icon.displayName = "Icon";
