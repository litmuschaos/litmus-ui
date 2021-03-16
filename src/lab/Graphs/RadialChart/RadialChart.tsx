import { useTheme } from "@material-ui/core";
import { Arc, Group, ParentSize } from "@visx/visx";
import React, { useState } from "react";
import { LegendTable } from "../LegendTable";
import { LegendData } from "../LegendTable/base";
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
  centerSize = 20,
  semiCircle = false,
  legendTableHeight = 150,
  showLegend = true,
  heading,
  circleExpandOnHover = 5,
}: RadialChartChildProps) => {
  const { palette } = useTheme();

  let legenddata: Array<LegendData> = [{ data: [] }];
  const [centerValue, setcenterValue] = useState<string>("0");
  const [centerText, setCenterText] = useState<string>(heading ?? "");
  const [currentHovered, setcurrentHovered] = useState<string>("");

  const circleOrient = semiCircle ? 1 : 2;
  const classes = useStyles({ width, height, circleOrient });
  const scalerArc: number = circleOrient * Math.PI;
  const startAngle: number = -(Math.PI / 2);
  let currentAngle: number = startAngle;
  const outerRadius =
    (circleOrient === 1 ? Math.max(width, height) : Math.min(width, height)) *
      0.5 -
    centerSize;
  const innerRadius = outerRadius - centerSize;

  const total = radialData
    ? radialData.reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0
      )
    : NaN;
  const radialArc: RadialChartMetric[] = radialData
    ? radialData.map((elem) => {
        return {
          value: (total ? elem.value / total : 0) * scalerArc,
          label: elem.label,
          baseColor: elem.baseColor,
        };
      })
    : [{ value: NaN, label: "" }];
  if (centerValue === "0" && total > 0) {
    setcenterValue(total.toString());
    setCenterText(heading ?? "");
  }

  legenddata = legenddata.splice(0);
  if (radialData) {
    radialData.map((element, index) => {
      if (element.value !== undefined)
        legenddata[index] = {
          data: [element.label, element.value.toString()],
          baseColor: element.baseColor,
        };
    });
  }
  return width < 10 ? null : (
    <div className={classes.radialChartRoot}>
      <div style={{ display: "flex" }}>
        <div>
          <svg width={width / 2} height={height}>
            <rect
              width={width / 2}
              height={height}
              className={classes.rectBase}
              rx={14}
            />

            <Group
              top={circleOrient === 1 ? height : height / 2}
              left={width / 4}
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
                        setcenterValue(radialData[i].value.toString());
                        setCenterText(`${elem.label}`);
                        setcurrentHovered(
                          e.currentTarget.getAttribute("id")?.toString() ?? ""
                        );
                      }}
                      onMouseLeave={() => {
                        setcenterValue(total.toString());
                        setCenterText(`${heading}`);
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
        <div
          style={{
            display: "flex",
            width: width / 2,
            height: height,
            background: "black !important",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: width / 2,
              height: legendTableHeight,
            }}
          >
            {showLegend && <LegendTable data={legenddata} />}
          </div>
        </div>
      </div>
      <div className={classes.centerDataContainer}>
        <p className={`${classes.centerValue} ${classes.centerDataFont}`}>
          {centerValue}
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
