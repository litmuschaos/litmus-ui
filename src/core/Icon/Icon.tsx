import React from "react";
import SVG from "react-inlinesvg";
import { IconName, IconSize } from "./base";
import { useStyles } from "./style";
import {
  iconsPathWithStorke,
  iconsWithRectFill,
  iconsWithRectStroke,
} from "./utils";

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
    case "xxxl":
      return 48;
  }
};

const Icon: React.FC<IconProps> = ({
  size = "md",
  name,
  className,
  style,
  color = "black",
  ...divElementProps
}) => {
  const classes = useStyles({
    color: color,
    pathStroke: iconsPathWithStorke.includes(name),
    rectFill: iconsWithRectFill.includes(name),
    rectStroke: iconsWithRectStroke.includes(name),
  });
  const svgSize = getSvgSize(size);
  const iconPath = `${iconRoot}${name}.svg`;
  return (
    <div
      className={classes.container}
      {...divElementProps}
      data-testid="icon-component"
    >
      <SVG
        cacheRequests={true}
        src={iconPath}
        width={svgSize}
        height={svgSize}
        className={`${classes.icon}
            ${className}`}
        style={style}
      >
        {/* fallback content in case of a fetch error or unsupported browser*/}
        <img src={iconPath} alt={name} />
      </SVG>
    </div>
  );
};
export { Icon };
