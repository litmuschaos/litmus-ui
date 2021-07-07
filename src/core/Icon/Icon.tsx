import React from "react";
import SVG from "react-inlinesvg";
import { IconName, IconSize, onlyStorke, withRect } from "./base";
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
    fill: onlyStorke.includes(name) ? "none" : color,
    stroke: onlyStorke.includes(name) ? color : "none",
    rect: withRect.includes(name),
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
