import { useTheme } from "@material-ui/core";
import { Arc, Group, ParentSize } from "@visx/visx";
import React, { useEffect, useState } from "react";
import { LegendData, LegendTable } from "../../LegendTable";
import { RadialChartMetric, RadialGraphProps } from "../base";
import { useStyles } from "./styles";

export type LegendTableOrientation = "bottom" | "right" | undefined;

export interface RadialChartProps extends RadialGraphProps {
  // Height of the Legent Table as number
  legendTableHeight?: number;

  // Boolean for enabling/disabling the corresponding Legend Table
  showLegend?: boolean;

  // Array of object of RadialChartMetric data for plotting the chart
  radialData: RadialChartMetric[];

  // Boolean for enabling/disabling the center heading
  showCenterHeading?: boolean;

  // Increase in the size of the radial arcs on hover
  circleExpandOnHover?: number;

  // For the orientation of the LegendTable either "right" or "bottom"
  alignLegendTable?: LegendTableOrientation;
}
interface RadialChartChildProps extends RadialChartProps {
  // Width of the parent component automatically calcuated by the child
  width: number;

  // Height of the parent component automatically calcuated by the child
  height: number;
}

const RadialChartChild = ({
  width,
  height,
  radialData,
  arcWidth = 20,
  semiCircle = false,
  legendTableHeight = 120,
  showLegend = true,
  heading,
  circleExpandOnHover = 5,
  alignLegendTable = "bottom",
  showCenterHeading = true,
  unit = "",
  className,
}: RadialChartChildProps) => {
  const { palette } = useTheme();

  // Initialize legendData
  let legendData: Array<LegendData> = [{ data: [] }];

  // Initialize state of central value to be displayed based on user action (hovering)
  const [centerValue, setcenterValue] = useState<string>("0");

  // Initialize state of central text to be displayed based on user action (hovering)
  const [centerText, setCenterText] = useState<string>(heading ?? "");

  // Initialize state of arc on which user is hovering
  const [currentHovered, setcurrentHovered] = useState<string>("");

  // For the radial figure of the legnend Table is to be place at the
  // bottom then assign width
  // else assign width/2
  const radialFigureWidth = alignLegendTable === "bottom" ? width : width / 2;

  // Set the circle orientation as per user
  const circleOrient = semiCircle ? 1 : 2;

  // Scale of the arc will be based on circle orientation
  const scalerArc: number = circleOrient * Math.PI;

  // Start angle is assigned value such that arc are
  // plotted starting from 180 degree on the graph (2nd Quadrant)
  const startAngle: number = -(Math.PI / 2);

  // Current angle is assigned with the start angle
  let currentAngle: number = startAngle;

  let radialFigureHeight: number = height;

  if (showLegend && alignLegendTable === "bottom") {
    radialFigureHeight = height - legendTableHeight;
  }

  // Initialize outer radius
  let outerRadius = 0;

  // Based on circle orientation and legendTable alignment
  // as per geometry the outer radius is decided
  if (circleOrient === 1) {
    // For semiCircle
    if (alignLegendTable === "bottom") {
      // For semiCircle with bottom legendTable
      outerRadius = Math.min(radialFigureWidth / 2, radialFigureHeight);
    } else {
      // For semiCircle with right legendTable
      outerRadius = Math.min(radialFigureWidth, radialFigureHeight) / 2;
    }
  } else {
    // For circle with any alignement of legendTable
    outerRadius = Math.min(radialFigureWidth, radialFigureHeight) / 2;
  }

  // Inner radius
  const innerRadius = outerRadius - arcWidth - circleExpandOnHover;

  // Usestyles
  const classes = useStyles({
    width,
    height: alignLegendTable === "bottom" ? height + legendTableHeight : height,
    circleOrient,
    alignLegendTable,
    legendTableHeight,
    innerRadius,
    outerRadius,
    arcWidth,
  });

  // Calculate the total of all the value passed in the Metric
  const total = radialData
    ? radialData.reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0
      )
    : NaN;

  // Construct radialArc data, here the values passed by the user
  // are converted to radian
  const radialArc: RadialChartMetric[] = radialData
    ? radialData.map((elem) => {
        return {
          value: (total ? elem.value / total : 0) * scalerArc,
          label: elem.label,
          baseColor: elem.baseColor,
        };
      })
    : [{ value: NaN, label: "" }];

  // Assign central value and text
  if (centerValue === "0" && total > 0) {
    setcenterValue(total.toString());
    if (showCenterHeading) {
      setCenterText(heading ?? "");
    }
  }

  //  Clean legend data
  legendData = legendData.splice(0);

  // If the radial data is defined then constuct legendData to be
  // passed to the Legend Table component
  if (radialData) {
    radialData.map((element, index) => {
      if (element.value !== undefined)
        legendData[index] = {
          data: [element.label ?? "", element.value.toString()],
          baseColor: element.baseColor,
        };
    });
  }
  // If any change in the data is made then total and heading will be rest
  //  Helpful for use case
  //  where you schedule a workflow and you want it to be reflected to the
  //  radial chart
  //  if this useEffect is not there
  // then user will have to do a hard refresh on the page to see the updated
  //  graph
  useEffect(() => {
    if (total > 0) {
      setcenterValue(total.toString());
      if (showCenterHeading) {
        setCenterText(heading ?? "");
      }
    }
  }, [heading, showCenterHeading, total]);

  return width < 10 ? null : (
    <div className={`${classes.radialChartRoot} ${className}`}>
      <div className={classes.figureWithLegendTable}>
        <svg width={radialFigureWidth} height={radialFigureHeight}>
          <rect
            width={radialFigureWidth}
            height={radialFigureHeight}
            className={classes.rectBase}
          />

          <Group top={outerRadius} left={radialFigureWidth / 2}>
            {/* Render the radial graph if total is greater than 0 and then 
            iterate over the radialArc */}
            {total > 0 &&
              radialArc &&
              radialArc.map((elem, i) => (
                <g key={`${elem.label}-arc-group`}>
                  <Arc
                    id={`${elem.label}-arc`}
                    data={elem.value}
                    // If user is hovering over this arc
                    //  then this arc label is stored in currentHoverd
                    //  so decide the inner radius accordingly
                    innerRadius={
                      currentHovered === `${elem.label}-arc`
                        ? innerRadius - circleExpandOnHover * 2
                        : innerRadius - circleExpandOnHover
                    }
                    // Same calc as inner Radius
                    // only difference is that it expands outwards
                    outerRadius={
                      currentHovered === `${elem.label}-arc`
                        ? outerRadius - circleExpandOnHover
                        : outerRadius - circleExpandOnHover * 2
                    }
                    fill={elem.baseColor}
                    startAngle={currentAngle}
                    endAngle={(currentAngle += elem.value)}
                    // When user hovers over this arc then
                    // 1. Update the central value with the value of this arc
                    // 2. Update the central text with the label of this arc
                    // 3. Update the central hovered state with the label of this arc
                    // for setting the expansion
                    onMouseEnter={(e) => {
                      setcenterValue(radialData[i].value.toString());
                      if (showCenterHeading) {
                        setCenterText(radialData[i].label?.toString() ?? "");
                      }
                      setcurrentHovered(
                        e.currentTarget.getAttribute("id")?.toString() ?? ""
                      );
                    }}
                    // When user moves outside this arc then
                    //  1. Update/Rest central value with the value of total
                    //  2. Update/Rest central text with the heading
                    //  3. Empty the currentHovered state
                    onMouseLeave={() => {
                      setcenterValue(total.toString());
                      if (showCenterHeading) {
                        setCenterText(heading ?? "");
                      }
                      setcurrentHovered("");
                    }}
                    // Set opacity as per user hover
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
        {/* Display legend table */}
        {showLegend && (
          <div className={classes.legendTableArea}>
            <div className={classes.legendTableChild}>
              <LegendTable data={legendData} />
            </div>
          </div>
        )}
      </div>
      {/*  Display central value and text */}
      <div className={classes.centerDataContainer}>
        <p className={`${classes.centerValue} ${classes.centerDataFont}`}>
          {`${centerValue} ${unit}`}
        </p>

        {showCenterHeading && (
          <p className={`${classes.centerText} ${classes.centerDataFont}`}>
            {centerText}
          </p>
        )}
      </div>
    </div>
  );
};
const RadialChart: React.FC<RadialChartProps> = ({ ...rest }) => {
  return (
    // ParentSize calculates the (width,height) of the parent and passes
    // it to the RadialChartChild along with other props
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
