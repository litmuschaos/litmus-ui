import { useTheme } from "@material-ui/core";
import {
  AreaClosed,
  AxisBottom,
  AxisLeft,
  AxisScale,
  curveMonotoneX,
  curveStepAfter,
  GridColumns,
  GridRows,
  Group,
  Line,
  LinearGradient,
  LinePath,
  MarkerCircle,
  Polygon,
} from "@visx/visx";
import dayjs from "dayjs";
import React from "react";
import { DateValue, StrictColorGraphMetric } from "./base";
import { removeSpecialChar } from "./utils";

// Accessors
// TODO these accessors may be moved to utils
// Return date in number type
const getDateNum = (d: DateValue) =>
  typeof d.date === "number"
    ? new Date(d.date)
    : new Date(parseInt(d.date, 10));

// Returns Value in number type
const getValueNum = (d: DateValue) =>
  typeof d.value === "number" ? d.value : parseInt(d.value, 10);

// Returns Value in string type
const getValueStr = (d: DateValue) =>
  typeof d.value === "number" ? d.value.toFixed(2).toString() : d.value;

let numValue = "";

// Convert long digit number to short representation
// Also appends the unit passed by the user
const intToString = (value: number, unit: string) => {
  numValue = "";
  const suffixes = ["", "k", "m", "b", "t"];
  const suffixNum = Math.floor(
    Math.floor(Math.abs(value)).toString().length / 3
  );
  const shortValue = parseFloat(
    (suffixNum !== 0 ? value / 1000 ** suffixNum : value).toPrecision(2)
  );
  numValue = shortValue.toString();
  if (shortValue % 1 !== 0) {
    numValue = shortValue.toFixed(2);
  }
  return `${numValue}${suffixes[suffixNum]} ${unit}`;
};

// Return the date in the string type as per the format passed by the user
const dateFormat = (date: number, xAxistimeFormat: string) => {
  return dayjs(new Date(date)).format(xAxistimeFormat);
};

interface AreaChartProps {
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  closedSeries?: Array<StrictColorGraphMetric>;
  openSeries?: Array<StrictColorGraphMetric>;
  eventSeries?: Array<StrictColorGraphMetric>;
  showGrid?: boolean;
  width: number;
  height: number;
  yMax: number;
  xMax: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  hideBottomAxis?: boolean;
  hideLeftAxis?: boolean;
  hideRightAxis?: boolean;
  top?: number;
  left?: number;
  showPoints: boolean;
  yLabel?: string;
  unit?: string;
  xAxistimeFormat?: string;
  yLabelOffset?: number;
  showEventMarkers?: boolean;
}

const PlotLineAreaGraph: React.FC<AreaChartProps> = ({
  height,
  width,
  closedSeries,
  openSeries,
  eventSeries,
  yMax,
  xMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  children,
  showPoints = true,
  showGrid = true,
  unit = "",
  xAxistimeFormat,
  yLabel,
  yLabelOffset = 10,
  showEventMarkers = true,
}) => {
  const { palette } = useTheme();

  // x-axis ticks label style
  const axisBottomTickLabelProps = {
    dy: "0.3rem",
    textAnchor: "middle" as const,
    fontSize: "12px",
    fontWeight: 400,
    fill: palette.text.hint,
    lineHeight: "12px",
  };

  // y-axis ticks label style
  const axisLeftTickLabelProps = {
    dy: "0.3rem",
    dx: "-0.3rem",
    fontWeight: 400,
    fontSize: "10px",
    textAnchor: "end" as const,
    lineHeight: "12px",
    fill: palette.text.hint,
  };
  const yLabelProps = {
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "12px",
    fill: palette.text.primary,
    background: "red",
  };

  if (width < 10) return null;
  return (
    <Group left={left ?? margin?.left ?? 0} top={top ?? margin?.top ?? 0}>
      {/* display grid in the graph */}
      {showGrid && (
        <Group>
          <GridRows
            scale={yScale}
            width={xMax}
            strokeOpacity={0.5}
            strokeWidth={0.5}
            stroke={palette.border.main}
          />
          <GridColumns
            scale={xScale}
            height={height}
            strokeOpacity={0.5}
            strokeWidth={0.5}
            stroke={palette.border.main}
          />
        </Group>
      )}
      {/* map over closedSeries */}
      {closedSeries &&
        closedSeries.length > 0 &&
        closedSeries.map((linedata: StrictColorGraphMetric, index) => (
          <Group key={`closedSeriesGroup-${linedata.metricName}-${index}`}>
            {/* LinearGradient for each metric based on its color */}
            <LinearGradient
              id={`${removeSpecialChar(linedata.metricName)}-${
                linedata.baseColor
              }-linearGragient`}
              from={linedata.baseColor}
              to={linedata.baseColor}
              fromOpacity={0.5}
              toOpacity={0.1}
            />

            {/* Plot area closed under the curve graph */}
            <AreaClosed<DateValue>
              data={linedata.data}
              x={(d) => xScale(getDateNum(d)) || 0}
              y={(d) => yScale(getValueNum(d)) || 0}
              yScale={yScale}
              strokeWidth={2}
              stroke={linedata.baseColor}
              fill={`url(#${removeSpecialChar(linedata.metricName)}-${
                linedata.baseColor
              }-linearGragient)`}
              curve={curveMonotoneX}
            />
            {/* Plot points for each data point if showPoints is true */}
            {showPoints &&
              linedata.data.map((d: DateValue, index) => (
                <g
                  key={`dataPoint-${d.date}-${d.value}-${linedata.metricName}-${index}`}
                >
                  <circle
                    cx={xScale(getDateNum(d)) ?? NaN}
                    cy={yScale(getValueNum(d)) ?? NaN}
                    r={5}
                    fill={linedata.baseColor}
                    fillOpacity={0.7}
                    pointerEvents="none"
                  />
                </g>
              ))}
          </Group>
        ))}

      {/* Plot x-axis if hideBottomAxis is false */}
      {!hideBottomAxis &&
        (xAxistimeFormat ? (
          <AxisBottom
            top={yMax}
            scale={xScale}
            // number of Ticks
            numTicks={width > 520 ? 6 : 5}
            tickFormat={(num) => dateFormat(num, xAxistimeFormat)}
            stroke={palette.text.primary}
            tickLabelProps={() => axisBottomTickLabelProps}
          />
        ) : (
          <AxisBottom
            top={yMax}
            scale={xScale}
            numTicks={width > 520 ? 6 : 5}
            stroke={palette.text.primary}
            tickLabelProps={() => axisBottomTickLabelProps}
          />
        ))}

      {/* Plot y-axis if hideLeftAxis is false */}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          // number of Ticks
          numTicks={height > 200 ? 7 : 6}
          stroke={palette.text.primary}
          tickFormat={(num) => intToString(num, unit)}
          tickLabelProps={() => axisLeftTickLabelProps}
          label={yLabel ?? ""}
          labelProps={yLabelProps}
          labelOffset={yLabelOffset}
        />
      )}

      {/* Plot eventSeries metric  */}
      {eventSeries &&
        eventSeries.length > 0 &&
        eventSeries.map((linedata, index) => (
          <Group key={`eventSeriesGroupt-${linedata.metricName}-${index}`}>
            <AreaClosed<DateValue>
              data={linedata.data}
              x={(d) => xScale(getDateNum(d)) || 0}
              y={(d) => {
                if (getValueStr(d) === "False" || getValueStr(d) === "End") {
                  return yScale(yScale.domain()[0]) ?? 0;
                }
                return yScale(yScale.domain()[1]) ?? 0;
              }}
              yScale={yScale}
              fill={linedata.baseColor}
              fillOpacity={0.15}
              curve={curveStepAfter}
            />
            {/* Plot event markers  */}
            {showEventMarkers &&
              linedata.data.map((d, index) => (
                <g
                  key={`dataPoint-${d.date}-${d.value}-${linedata.metricName}-${index}`}
                >
                  {(getValueStr(d) === "Start" || getValueStr(d) === "End") && (
                    <g>
                      {/* Here, it will plot a triangle */}
                      <Polygon
                        sides={3}
                        size={6}
                        stroke={linedata.baseColor}
                        opacity={0.6}
                        strokeWidth={5}
                        center={{
                          x: xScale(getDateNum(d)) ?? 0,
                          y: yScale(yScale.domain()[0]) ?? 0,
                        }}
                        fill={linedata.baseColor}
                        pointerEvents="none"
                        rotate={90}
                        style={{ strokeLinejoin: "round" }}
                      />
                      <Line
                        from={{ x: xScale(getDateNum(d)) ?? 0, y: 0 }}
                        to={{
                          x: xScale(getDateNum(d)) ?? 0,
                          y: yMax,
                        }}
                        stroke={linedata.baseColor}
                        strokeWidth={0.7}
                      />
                    </g>
                  )}
                  )
                </g>
              ))}
          </Group>
        ))}
      {/* Plot openSeries */}
      {openSeries &&
        openSeries.length > 0 &&
        openSeries.map((openLineData, j) => (
          <g key={`openSeriesGroup-${openLineData.metricName}-${j}`}>
            <MarkerCircle
              id={`${j}-circle`}
              fill={openLineData.baseColor}
              size={2.5}
              refX={2.5}
              fillOpacity={0.6}
            />
            {/* Draw the line graph */}
            <LinePath<DateValue>
              data={openLineData.data}
              x={(d) => xScale(getDateNum(d)) ?? 0}
              y={(d) => yScale(getValueNum(d)) ?? 0}
              strokeWidth={2}
              stroke={openLineData.baseColor}
              strokeOpacity={0.7}
              curve={curveMonotoneX}
              // Plot marker for each data point
              markerMid={showPoints ? `url(#${j}-circle)` : ""}
              markerStart={showPoints ? `url(#${j}-circle)` : ""}
              markerEnd={showPoints ? `url(#${j}-circle)` : ""}
            />
          </g>
        ))}

      {children}
    </Group>
  );
};

export { PlotLineAreaGraph };
