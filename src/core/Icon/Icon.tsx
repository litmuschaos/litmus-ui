import React from "react";
import SVG from "react-inlinesvg";
import { IconName, IconSize } from "./base";
import { getIcon } from "./iconBundle";
import { useStyles } from "./style";
import {
  iconsPathWithStroke,
  iconsWithRectFill,
  iconsWithRectStroke,
} from "./utils";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  // Name of the icon
  name: IconName;

  // Size of the icon
  size?: IconSize;

  // Color of the icon
  color?: string;
}

// Return the size of the icon as per standard icon size
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
    case "2xl":
      return 32;
    case "3xl":
      return 48;
    case "4xl":
      return 100;
    case "5xl":
      return 180;
  }
};

const Icon: React.FC<IconProps> = ({
  size = "md",
  name,
  className,
  style,
  color = "black",
  ...rest
}) => {
  // Initialize the styling
  const classes = useStyles({
    color: color,

    // To check whether this icon has stroke
    pathStroke: iconsPathWithStroke.includes(name),

    // To check whether this icon has rect fill
    rectFill: iconsWithRectFill.includes(name),

    // To check whether this icon has rect stroke
    rectStroke: iconsWithRectStroke.includes(name),
  });

  // Size of the svg will be based on the standard size
  // passed by the user
  const svgSize = getSvgSize(size);

  return (
    <div
      className={`${classes.container}  ${className}`}
      style={style}
      {...rest}
      data-testid="icon-component"
    >
      {/* Render SVG with the icon */}
      <SVG
        src={getIcon(name)}
        width={svgSize}
        height={svgSize}
        className={classes.icon}
      >
        {/* fallback content in case of a fetch error or unsupported browser*/}
        <img src={getIcon(name)} alt={name} />
      </SVG>
    </div>
  );
};
export { Icon };
