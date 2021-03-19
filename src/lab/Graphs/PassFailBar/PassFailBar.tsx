import { Typography } from "@material-ui/core";
import { ParentSize } from "@visx/visx";
import React from "react";
import { useStyles } from "./styles";

export interface PassFailBarProps {
  // Pass percentage value as number
  passPercentage: number;

  // Optional className for overriding the styles
  className?: string;
}
export interface PassFailBarChildProps extends PassFailBarProps {
  // Width of the parent component automatically calcuated by the child
  width: number;

  // Height of the parent component automatically calcuated by the child
  height: number;
}

const PassFailBarChild = ({
  width,
  height,
  passPercentage,
  className,
}: PassFailBarChildProps) => {
  const classes = useStyles({
    width,
    height,
    pass: `${passPercentage ?? 0}%`,
    fail: `${100 - passPercentage ?? 0}%`,
  });

  return width < 10 ? null : (
    <div className={`${classes.passFailRoot} ${className}`}>
      <div className={classes.barAndText}>
        <div className={`${classes.singleBar} ${classes.passBar} `} />
        <Typography
          variant="h6"
          className={`${classes.passText} ${classes.text}`}
        >{`${passPercentage ?? 0}%`}</Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div className={`${classes.singleBar} ${classes.failBar} `} />
        <Typography
          variant="h6"
          className={`${classes.failText} ${classes.text}`}
        >{`${100 - passPercentage ?? 0}%`}</Typography>
      </div>
    </div>
  );
};
const PassFailBar: React.FC<PassFailBarProps> = ({ ...rest }) => {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <PassFailBarChild width={width} height={height} {...rest} />
        )
      }
    </ParentSize>
  );
};

export { PassFailBar };
