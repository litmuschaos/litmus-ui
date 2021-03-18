import { Typography } from "@material-ui/core";
import { ParentSize } from "@visx/visx";
import React from "react";
import { PassFailBarChildProps, PassFailBarProps } from "./base";
import { useStyles } from "./styles";

const PassFailBarChild = ({
  width,
  height,
  passValue,
  className,
}: PassFailBarChildProps) => {
  const classes = useStyles({
    width,
    height,
    pass: `${passValue ?? 0}%`,
    fail: `${100 - passValue ?? 0}%`,
  });

  return width < 10 ? null : (
    <div className={`${classes.radialChartRoot} ${className}`}>
      <div style={{ display: "flex" }}>
        <div className={classes.pass}>
          <div className={`${classes.symbol} ${classes.colorPass}`}>
            &#10003;
          </div>
        </div>
        <div className={classes.fail}>
          <div className={`${classes.symbol} ${classes.colorFail}`}>
            &#10005;
          </div>
        </div>
      </div>
      <div className={classes.textValue}>
        <Typography variant="h6" className={classes.colorPass}>
          {`${passValue ?? 0}%`}
        </Typography>

        <Typography variant="h6" className={classes.colorFail}>
          {`${100 - passValue ?? 0}%`}
        </Typography>
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
