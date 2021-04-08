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
import { DateValue, GraphMetric } from "./base";

// Accessors
const getDateNum = (d: DateValue) =>
  typeof d.date === "number"
    ? new Date(d.date)
    : new Date(parseInt(d.date, 10));
const getValueNum = (d: DateValue) =>
  typeof d.value === "number" ? d.value : parseInt(d.value, 10);

const getValueStr = (d: DateValue) =>
  typeof d.value === "number" ? d.value.toFixed(2).toString() : d.value;

let numValue = "";
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
const dateFormat = (date: number, xAxistimeFormat: string) => {
  return dayjs(new Date(date)).format(xAxistimeFormat);
};

interface AreaChartProps {
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  closedSeries?: Array<GraphMetric>;
  openSeries?: Array<GraphMetric>;
  eventSeries?: Array<GraphMetric>;
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
  const axisBottomTickLabelProps = {
    dy: "0.3rem",
    textAnchor: "middle" as const,
    fontFamily: "Ubuntu",
    fontSize: "12px",
    fontWeight: 400,
    fill: palette.text.hint,
    lineHeight: "12px",
  };
  const axisLeftTickLabelProps = {
    dy: "0.3rem",
    dx: "-0.3rem",
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontSize: "10px",
    textAnchor: "end" as const,
    lineHeight: "12px",
    fill: palette.text.hint,
  };
  const yLabelProps = {
    fontFamily: "Ubuntu",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "12px",
    fill: palette.text.primary,
    background: "red",
  };

  if (width < 10) return null;
  return (
    <Group left={left || margin?.left} top={top || margin?.top}>
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
      {closedSeries &&
        closedSeries.length > 0 &&
        closedSeries.map((linedata: GraphMetric, index) => (
          <Group key={`closedSeriesGroup-${linedata.metricName}-${index}`}>
            <LinearGradient
              id={`${linedata.metricName}-${linedata.baseColor}-linearGragient`}
              from={linedata.baseColor}
              to={linedata.baseColor}
              fromOpacity={0.5}
              toOpacity={0.1}
            />

            <AreaClosed<DateValue>
              data={linedata.data}
              x={(d) => xScale(getDateNum(d)) || 0}
              y={(d) => yScale(getValueNum(d)) || 0}
              yScale={yScale}
              strokeWidth={2}
              stroke={linedata.baseColor}
              fill={`url(#${linedata.metricName}-${linedata.baseColor}-linearGragient)`}
              curve={curveMonotoneX}
            />

            {showPoints &&
              linedata.data.map((d, index) => (
                <g
                  key={`dataPoint-${d.date}-${d.value}-${linedata.metricName}-${index}`}
                >
                  <circle
                    cx={xScale(getDateNum(d))}
                    cy={yScale(getValueNum(d))}
                    r={5}
                    fill={linedata.baseColor}
                    fillOpacity={0.7}
                    pointerEvents="none"
                  />
                </g>
              ))}
          </Group>
        ))}
      {!hideBottomAxis &&
        (xAxistimeFormat ? (
          <AxisBottom
            top={yMax}
            scale={xScale}
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

      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={height > 200 ? 7 : 6}
          stroke={palette.text.primary}
          tickFormat={(num) => intToString(num, unit)}
          tickLabelProps={() => axisLeftTickLabelProps}
          label={yLabel}
          labelProps={yLabelProps}
          left={left}
          labelOffset={yLabelOffset}
        />
      )}

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
                } else {
                  return yScale(yScale.domain()[1]) ?? 0;
                }
              }}
              yScale={yScale}
              fill={linedata.baseColor}
              fillOpacity={0.15}
              curve={curveStepAfter}
            />

            {showEventMarkers &&
              linedata.data.map((d, index) => (
                <g
                  key={`dataPoint-${d.date}-${d.value}-${linedata.metricName}-${index}`}
                >
                  {(getValueStr(d) === "Start" || getValueStr(d) === "End") && (
                    <g>
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
                        from={{ x: xScale(getDateNum(d)), y: 0 }}
                        to={{
                          x: xScale(getDateNum(d)),
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
            <LinePath<DateValue>
              data={openLineData.data}
              x={(d) => xScale(getDateNum(d)) ?? 0}
              y={(d) => yScale(getValueNum(d)) ?? 0}
              strokeWidth={2}
              stroke={openLineData.baseColor}
              strokeOpacity={0.7}
              curve={curveMonotoneX}
              markerMid={showPoints ? `url(#${j}-circle)` : undefined}
              markerStart={showPoints ? `url(#${j}-circle)` : undefined}
              markerEnd={showPoints ? `url(#${j}-circle)` : undefined}
            />
          </g>
        ))}

      {children}
    </Group>
  );
};

export { PlotLineAreaGraph };
