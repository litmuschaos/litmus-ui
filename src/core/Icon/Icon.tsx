import React from "react";
import SVG from "react-inlinesvg";
import {
  IconName,
  IconSize,
  onlyStorke,
  withRectFill,
  withRectStroke,
} from "./base";
import { useStyles } from "./style";

const iconRoot = "/assets/icons/";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName;
  size?: IconSize;
  color?: string;
}
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
      return 32;
  }
};

const Icon: React.FC<IconProps> = ({
  size = "md",
  name,
  className,
  style,
  color = "red",
  ...divElementProps
}) => {
  const classes = useStyles({
    color: color,
    pathStroke: onlyStorke.includes(name),
    rectFill: withRectFill.includes(name),
    rectStroke: withRectStroke.includes(name),
  });
  const svgSize = getSvgSize(size);
  const iconPath = `${iconRoot}${name}.svg`;
  return (
    <div className={classes.container} {...divElementProps}>
      <img src={iconPath} />
      <SVG
        cacheRequests={true}
        src={iconPath}
        width={svgSize}
        height={svgSize}
        className={`${classes.icon}
            ${className}`}
        style={style}
      />
    </div>
  );
};
export { Icon };
