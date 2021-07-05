import SVG from "@leeoniya/react-inlinesvg";
import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { IconName, IconSize } from "./base";

// const iconRoot = "/public/img/icons/";
const iconRoot = "/src/assets/";

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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    label: "Icon",
    display: "inline-block",
  },
  icon: {
    verticalAlign: "middle",
    display: "inline-block",
    marginBottom: "1rem",
    fill: "white",
    "& path": {
      fill: "white",
      stroke: "blue",
    },
  },
  orange: {
    fill: theme.palette.highlight,
  },
}));

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ size = "md", name, className, style, ...divElementProps }, ref) => {
    if (name === "panel-add") {
      size = "xl";
    }

    const styles = useStyles();
    const svgSize = getSvgSize(size);
    const svgHgt = svgSize;
    const svgWid = name?.startsWith("gf-bar-align")
      ? 16
      : name?.startsWith("gf-interp")
      ? 30
      : svgSize;
    const svgPath = "/assets/litmusLogo.svg";

    return (
      <div className={styles.container} {...divElementProps} ref={ref}>
        <SVG
          src={"/assets/icons/workflowPending.svg"}
          width={svgWid}
          height={svgHgt}
          className={`${styles.icon}
            ${className}`}
          style={style}
        />
      </div>
    );
  }
);

Icon.displayName = "Icon";
