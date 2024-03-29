import { useTheme } from "@material-ui/core";
import { Arc, Group, ParentSize } from "@visx/visx";
import React from "react";
import { RadialChartMetric, RadialGraphProps } from "../base";
import { useStyles } from "./styles";

export interface RadialProgressChartProps extends RadialGraphProps {
  // Object of RadialChartMetric data for plotting the chart
  radialData: RadialChartMetric;

  // Size of the icon
  iconSize?: string;

  // Top for the center icon
  iconTop?: string;

  // Url for the image/icon source
  imageSrc?: string;

  // Alternate text for image/icon
  imageAlt?: string;
}
interface RadialProgressChartChildProps extends RadialProgressChartProps {
  // Width of the parent component automatically calcuated by the child
  width: number;

  // Height of the parent component automatically calcuated by the child
  height: number;
}

const RadialProgressChartChild = ({
  width,
  height,
  radialData,
  iconTop,
  arcWidth = 20,
  semiCircle = false,
  iconSize = "3rem",
  heading,
  unit,
  imageSrc,
  imageAlt = "icon",
  className,
}: RadialProgressChartChildProps) => {
  // Get palette
  const { palette } = useTheme();

  // Initialize centerValue
  let centerValue = "0";

  // Initialize centerText
  const centerText = heading ?? "";

  // Initialize figure with
  // this variable is same as in RadialChart component
  // to be used if legendTable is added
  const radialFigurWidth = width;

  // Initialize the circle orientation
  const circleOrient = semiCircle ? 1 : 2;

  // Initialize the start angle in radian
  const startAngle: number = -(Math.PI / 2);

  // Initialize the current angle
  let currentAngle: number = startAngle;

  // Calc outer radius of the arc
  // based on the circle orientation
  //  and then subtract the width of the arc from it
  const outerRadius =
    (circleOrient === 1
      ? radialFigurWidth <= height * 2
        ? radialFigurWidth
        : height * 2
      : Math.min(radialFigurWidth, height)) *
      0.5 -
    arcWidth;

  // Calc the inner radius
  const innerRadius = outerRadius - arcWidth;

  // Initialize the styling
  const classes = useStyles({
    width,
    height,
    circleOrient,
    arcWidth,
    innerRadius,
    outerRadius,
    iconTop,
    iconSize,
    centerText,
    baseColor: radialData.baseColor,
  });

  // Initialize total
  const total: number = radialData.value ? 100 : NaN;

  // Scale of the arc will be based on circle orientation
  const scalerArc: number = circleOrient * Math.PI;

  // Construct radialArc data, here the values passed by the user
  // are converted to radian
  const radialArc: RadialChartMetric[] = radialData
    ? [
        {
          value: (total ? radialData.value / total : 0) * scalerArc,
          label: radialData.label,
          baseColor: radialData.baseColor,
        },
        {
          value: (total ? (total - radialData.value) / total : 0) * scalerArc,
          label: "rest",
          baseColor: palette.disabledBackground,
        },
      ]
    : [{ value: NaN }];

  // Assign central value with radialData passed by the user
  if (centerValue === "0" && total > 0) {
    {
      centerValue = radialData.value.toString();
    }
  }

  return width < 10 ? null : (
    <div className={`${classes.radialChartRoot} ${className}`}>
      <div className={classes.figureWithLegendTable}>
        <svg width={radialFigurWidth} height={height}>
          <rect
            width={radialFigurWidth}
            height={height}
            className={classes.rectBase}
          />

          <Group top={outerRadius} left={radialFigurWidth / 2}>
            {/* Render the radial graph if total is greater than 0 and then 
            iterate over the radialArc */}
            {total > 0 &&
              radialArc &&
              radialArc.map((elem) => (
                <g key={`${elem.label}-arc-group`}>
                  <Arc
                    data={elem.value}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    fill={elem.baseColor}
                    startAngle={currentAngle}
                    endAngle={(currentAngle += elem.value)}
                    opacity={1}
                  />
                </g>
              ))}

            {(currentAngle = Math.PI)}

            {/* If total is 0 then plot an a arc to show that no data is available */}
            {(total === 0 || Number.isNaN(total)) && (
              <Arc
                cornerRadius={2}
                padAngle={0.02}
                data
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill={palette.disabledBackground}
                startAngle={startAngle}
                endAngle={circleOrient === 1 ? Math.PI / 2 : 2 * Math.PI}
              />
            )}
          </Group>
        </svg>
      </div>
      {/* Dispaly Icon*/}
      <div className={classes.centerIcon}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
      {/* Display the central text and value */}
      <div className={classes.centerDataContainer}>
        <div className={`${classes.centerValue} ${classes.centerDataFont}`}>
          {centerValue + " " + unit}
        </div>
        {centerText && (
          <div className={`${classes.centerText} ${classes.centerDataFont}`}>
            {centerText}
          </div>
        )}
      </div>
    </div>
  );
};
const RadialProgressChart: React.FC<RadialProgressChartProps> = ({
  ...rest
}) => {
  return (
    // ParentSize calculates the (width,height) of the parent and passes
    // it to the RadialProgressChartChild along with other props
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <RadialProgressChartChild width={width} height={height} {...rest} />
        )
      }
    </ParentSize>
  );
};

export { RadialProgressChart };
