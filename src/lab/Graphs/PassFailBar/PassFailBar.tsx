import { Typography } from "@material-ui/core";
import { ParentSize } from "@visx/visx";
import React from "react";
import { RadialChartChildProps, RadialChartProps } from "./base";
import { useStyles } from "./styles";

const RadialChartChild = ({
  width,
  height,
  radialData,
  barWidth,
  className,
}: RadialChartChildProps) => {
  const classes = useStyles({
    width,
    height,
    barWidth,
    pass: `${radialData?.value ?? 0}%`,
    fail: `${100 - radialData?.value ?? 0}%`,
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
        <Typography
          variant="h6"
          className={classes.colorPass}
        >{`${radialData.value}%`}</Typography>

        <Typography variant="h6" className={classes.colorFail}>
          {`${100 - radialData?.value ?? 0}%`}
        </Typography>
      </div>
    </div>
  );
};
const RadialChart: React.FC<RadialChartProps> = ({ ...rest }) => {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <RadialChartChild width={width} height={height} {...rest} />
        )
      }
    </ParentSize>
  );
};

export { RadialChart };
