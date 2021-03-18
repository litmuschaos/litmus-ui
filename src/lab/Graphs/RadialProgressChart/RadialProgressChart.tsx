import { useTheme } from "@material-ui/core";
import { Arc, Group, ParentSize } from "@visx/visx";
import React, { useState } from "react";
import { LegendData } from "../LegendTable";
import {
  RadialChartChildProps,
  RadialChartMetric,
  RadialChartProps,
} from "./base";
import { useStyles } from "./styles";

const RadialChartChild = ({
  width,
  height,
  radialData,
  arcWidth = 20,
  semiCircle = false,
  heading,
  circleExpandOnHover = 5,
  unit,
  imageSrc,
  imageAlt = "i",
  className,
}: RadialChartChildProps) => {
  const { palette } = useTheme();

  let legenddata: Array<LegendData> = [{ data: [] }];
  let centerValue = "0";
  const centerText = heading ?? "";
  const [currentHovered, setcurrentHovered] = useState<string>("");
  const radialFigurWidth = width;
  const circleOrient = semiCircle ? 1 : 2;
  const startAngle: number = -(Math.PI / 2);
  let currentAngle: number = startAngle;
  const outerRadius =
    (circleOrient === 1
      ? Math.max(radialFigurWidth, height)
      : Math.min(radialFigurWidth, height)) *
      0.5 -
    arcWidth;
  const innerRadius = outerRadius - arcWidth;
  const classes = useStyles({
    width,
    height,
    circleOrient,
    innerRadius,
  });
  const total: number = radialData.value ? 100 : NaN;
  const scalerArc: number = circleOrient * Math.PI;

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
    : [{ value: NaN, label: "" }];

  if (centerValue === "0" && total > 0) {
    {
      centerValue = radialData.value.toString();
    }
  }

  legenddata = legenddata.splice(0);

  return width < 10 ? null : (
    <div className={`${classes.radialChartRoot} ${className}`}>
      <div className={classes.figureWithLegendTable}>
        <svg width={radialFigurWidth} height={height}>
          <rect
            width={radialFigurWidth}
            height={height}
            className={classes.rectBase}
          />

          <Group
            top={circleOrient === 1 ? height : height / 2}
            left={radialFigurWidth / 2}
          >
            {total > 0 &&
              radialArc &&
              radialArc.map((elem, i) => (
                <g key={`${elem.label}-arc-group`}>
                  <Arc
                    id={`${elem.label}-arc`}
                    data={elem.value}
                    innerRadius={
                      currentHovered === `${elem.label}-arc`
                        ? innerRadius - circleExpandOnHover
                        : innerRadius
                    }
                    outerRadius={
                      currentHovered === `${elem.label}-arc`
                        ? outerRadius + circleExpandOnHover
                        : outerRadius
                    }
                    fill={elem.baseColor}
                    startAngle={currentAngle}
                    endAngle={(currentAngle += elem.value)}
                    onMouseEnter={(e) => {
                      setcurrentHovered(
                        e.currentTarget.getAttribute("id")?.toString() ?? ""
                      );
                    }}
                    onMouseLeave={() => {
                      setcurrentHovered("");
                    }}
                    opacity={
                      currentHovered === ""
                        ? 1
                        : currentHovered === `${elem.label}-arc`
                        ? 1
                        : 0.7
                    }
                  />
                </g>
              ))}

            {(currentAngle = Math.PI)}
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
      <div className={classes.centerIcon}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className={classes.centerDataContainer}>
        <p className={`${classes.centerValue} ${classes.centerDataFont}`}>
          {centerValue + " " + unit}
        </p>

        <p className={`${classes.centerText} ${classes.centerDataFont}`}>
          {centerText}
        </p>
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
