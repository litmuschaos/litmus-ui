import { useTheme } from "@material-ui/core";
import { AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal, scaleTime } from "@visx/scale";
import { BarStack } from "@visx/shape";
import { useTooltip } from "@visx/tooltip";
import {
  AxisLeft,
  curveMonotoneX,
  LinePath,
  localPoint,
  Tooltip,
} from "@visx/visx";
import { extent } from "d3-array";
import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";
import { TooltipData, ToolTipDateValue } from "./base";
import { useStyles } from "./styles";
import { barData, openSeries } from "./testData";
import {
  bisectBarDate,
  bisectDate,
  getBarDateNum,
  getDateNum,
  getDateNumber,
  getValueNum,
  getValueStr,
} from "./utils";

export interface StackBarMetric {
  date: string;
  passPercentage: string;
  failPercentage: string;
  passCount: number;
  failCount: number;
}
type StackName = "passPercentage" | "failPercentage";
const dateFormat = (date: number, xAxistimeFormat: string) => {
  return dayjs(new Date(date)).format(xAxistimeFormat);
};
const intToString = (value: number, unit: string) => {
  let numValue = "";
  const shortValue = parseFloat(value.toPrecision(2));
  numValue = shortValue.toString();

  if (shortValue % 1 !== 0) {
    numValue = shortValue.toFixed(2);
  }
  return `${numValue} ${unit}`;
};

export type StackBarTooltipProps = {
  // Used for the tooltip to receive Tooltip data for the contruction of tooltip UI
  tooltipData: TooltipData;
};
export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxistimeFormat?: string;
  unit?: string;
  yLabel?: string;
  yLabelOffset?: number;
  StackBarTooltip?: ({
    tooltipData,
  }: StackBarTooltipProps) => React.ReactElement;
};

const defaultMargin = { top: 20, right: 50, bottom: 30, left: 80 };
const filteredBarSeries = barData;
const keys: StackName[] = ["passPercentage", "failPercentage"];

// accessors
const getDate = (d: StackBarMetric) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: filteredBarSeries.map(getDate),
  padding: 0.5,
});

const PlotStackBar = ({
  width,
  height,
  margin = defaultMargin,
  xAxistimeFormat = "MMM D,YYYY ",
  unit = "%",
  yLabel = "",
  yLabelOffset = 0,
  StackBarTooltip = ({ tooltipData }: StackBarTooltipProps) => {
    return (
      <div>
        {tooltipData.map((linedata, index) => (
          <div
            key={`tooltipName-value- ${linedata.metricName}-${index}`}
            style={{ lineHeight: "1.3rem" }}
          >
            <span>{`${linedata.metricName} ${getValueStr(
              linedata.data
            )}`}</span>
          </div>
        ))}
      </div>
    );
  },
}: BarStackProps) => {
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    tooltipOpen: true,
  });
  const filteredOpenSeries = openSeries;
  const classes = useStyles({
    width,
    height,
  });
  const { palette } = useTheme();
  const colorScale = scaleOrdinal<StackName, string>({
    domain: keys,
    range: [palette.status.completed, palette.status.failed],
  });

  const axisLeftTickLabelProps = {
    dy: "0.3rem",
    dx: "-0.3rem",
    fontWeight: 400,
    fontSize: "10px",
    textAnchor: "end" as const,
    lineHeight: "12px",
    fill: palette.text.hint,
  };
  const axisBottomTickLabelProps = {
    dy: "0.3rem",
    textAnchor: "middle" as const,
    fontSize: "12px",
    fontWeight: 400,
    fill: palette.text.hint,
    lineHeight: "12px",
  };
  const yLabelProps = {
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "12px",
    fill: palette.text.primary,
    background: "red",
  };

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(
          filteredOpenSeries
            ? [filteredOpenSeries]
                .map((linedata) => linedata.data)
                .reduce((rec, d) => rec.concat(d), [])
            : [{ date: NaN, value: NaN }],
          getDateNum
        ) as [Date, Date],
      }),
    [filteredOpenSeries, xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, 100],
        nice: true,
      }),
    [yMax]
  );

  dateScale.rangeRound([0, xMax]);

  //
  // tooltip handler

  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      let pointerDataSelection: ToolTipDateValue[] = [
        {
          metricName: "",
          data: {
            date: NaN,
            value: NaN,
          },
          baseColor: "",
        },
      ];
      if (true) {
        let { x } = localPoint(event) || { x: 0 };
        x -= margin.left;
        const x0 = xScale.invert(x);

        let i = 0;

        if (filteredOpenSeries) {
          const indexer = bisectDate(filteredOpenSeries.data, x0, 1);
          const dd0 = filteredOpenSeries.data[indexer - 1] ?? undefined;
          const dd1 = filteredOpenSeries.data[indexer] ?? undefined;

          if (dd1) {
            pointerDataSelection[i] =
              x0.valueOf() - getDateNum(dd0).valueOf() >
              getDateNum(dd1).valueOf() - x0.valueOf()
                ? {
                    metricName: "resiliencyScore",
                    data: {
                      date: dd1.date,
                      value: dd1.value,
                    },
                    baseColor: filteredOpenSeries.baseColor ?? "red",
                  }
                : {
                    metricName: "resiliencyScore",
                    data: {
                      date: dd0.date,
                      value: dd0.value,
                    },
                    baseColor: filteredOpenSeries.baseColor ?? "red",
                  };
            i++;
          }
        }
        // 1
        if (filteredBarSeries) {
          const indexer = bisectBarDate(filteredBarSeries, x0, 1);
          const dd0 = filteredBarSeries[indexer - 1] ?? undefined;
          const dd1 = filteredBarSeries[indexer] ?? undefined;

          //3
          if (dd1) {
            pointerDataSelection[i] =
              x0.valueOf() - getBarDateNum(dd0).valueOf() >
              getBarDateNum(dd1).valueOf() - x0.valueOf()
                ? {
                    metricName: "passCount",
                    data: {
                      date: dd1.date,
                      value: dd1.passCount,
                    },
                    baseColor: "red",
                  }
                : {
                    metricName: "passCount",
                    data: {
                      date: dd0.date,
                      value: dd0.passCount,
                    },
                    baseColor: "red",
                  };
            i++;
          }
          //4
          if (dd1) {
            pointerDataSelection[i] =
              x0.valueOf() - getBarDateNum(dd0).valueOf() >
              getBarDateNum(dd1).valueOf() - x0.valueOf()
                ? {
                    metricName: "failCount",
                    data: {
                      date: dd1.date,
                      value: dd1.failCount,
                    },
                    baseColor: "red",
                  }
                : {
                    metricName: "failCount",
                    data: {
                      date: dd0.date,
                      value: dd0.failCount,
                    },
                    baseColor: "red",
                  };
            i++;
          }
        }

        const firstToolTipData = pointerDataSelection[0];
        pointerDataSelection = pointerDataSelection.filter(
          (elem) =>
            elem.data &&
            firstToolTipData.data &&
            elem.data.date <= firstToolTipData.data.date
        );
      }
      if (width < 10) return null;
      const tooltipLeftValue =
        pointerDataSelection[0] && pointerDataSelection[0].data
          ? xScale(getDateNum(pointerDataSelection[0].data))
          : xScale(xMax);

      showTooltip({
        tooltipData: pointerDataSelection,
        tooltipLeft: tooltipLeftValue,
        tooltipTop: yMax / 2,
      });
    },

    [width, xScale, xMax, showTooltip, yMax, margin.left, filteredOpenSeries]
  );

  if (width < 10) return null;
  if (tooltipData && tooltipData[0]) {
    console.log("tooltip", tooltipData);
  }
  return width < 10 ? null : (
    <div style={{ position: "relative", margin: "1rem" }}>
      <svg width={width} height={height} onMouseLeave={() => hideTooltip()}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={"white"}
          rx={14}
        />
        <defs>
          <filter id="inset" x="-50%" y="-50%" width="200%" height="200%">
            <feFlood floodColor={"#5469D4"} result="outside-color" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1" />
            <feComposite
              in="outside-color"
              operator="in"
              result="outside-stroke"
            />

            <feFlood floodColor={"#FFF"} result="inside-color" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="inside-stroke"
            />

            <feMorphology in="SourceAlpha" radius="1.5" />
            <feComposite in="SourceGraphic" operator="in" result="fill-area" />

            <feMerge>
              <feMergeNode in="outside-stroke" />
              <feMergeNode in="inside-stroke" />
              <feMergeNode in="fill-area" />
            </feMerge>
          </filter>
        </defs>
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
        />
        <Group top={margin.top} left={margin.left}>
          <BarStack<StackBarMetric, StackName>
            data={filteredBarSeries}
            keys={keys}
            x={getDate}
            xScale={dateScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  return (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={
                        (xScale(parseInt(bar.bar.data.date, 10)) ?? 0) -
                        bar.width / 2
                      }
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      opacity={
                        tooltipData && tooltipData[0]
                          ? getDateNumber(bar.bar.data.date) ===
                            getDateNumber(tooltipData[0].data.date)
                            ? 1
                            : 0.4
                          : 1
                      }
                      fill={bar.color}
                    />
                  );
                })
              )
            }
          </BarStack>
          {openSeries && (
            <Group>
              <LinePath
                data={openSeries.data}
                x={(d) => xScale(getDateNum(d)) ?? 0}
                y={(d) => yScale(getValueNum(d)) ?? 0}
                strokeWidth={2}
                stroke={openSeries.baseColor ?? "red"}
                strokeOpacity={0.7}
                curve={curveMonotoneX}
              />
              {openSeries.data.map((d, index) => (
                <g
                  key={`dataPoint-${d.date}-${d.value}-${openSeries.metricName}-${index}`}
                >
                  <circle
                    cx={xScale(getDateNum(d))}
                    cy={yScale(getValueNum(d))}
                    r={7}
                    filter="url(#inset)"
                    fill={openSeries.baseColor ?? "#5469D4"}
                    fillOpacity={1}
                    pointerEvents="none"
                  />
                </g>
              ))}
            </Group>
          )}
        </Group>
        <Group>
          <rect
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            onMouseMove={handleTooltip}
            fill={"transparent"}
          />
        </Group>
        <AxisLeft
          scale={yScale}
          numTicks={height > 200 ? 7 : 6}
          stroke={palette.text.primary}
          tickFormat={(num) => intToString(num.valueOf(), unit)}
          tickLabelProps={() => axisLeftTickLabelProps}
          label={yLabel}
          labelProps={yLabelProps}
          left={margin.left}
          labelOffset={yLabelOffset}
          top={margin.top}
        />
        <AxisBottom
          numTicks={width > 520 ? 6 : 5}
          top={yMax + margin.top}
          left={margin.left}
          scale={xScale}
          stroke={palette.text.primary}
          tickStroke={palette.text.primary}
          tickFormat={(num) => dateFormat(num.valueOf(), xAxistimeFormat)}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      </svg>
      {tooltipData && tooltipData[0] && (
        <Tooltip
          left={tooltipLeft}
          top={tooltipTop}
          // Hardcoded value for tooltip
          // will be removed later
          className={`${classes.tooltipMetric} ${
            xMax - tooltipLeft < 200
              ? classes.tooltipMetricLeft
              : classes.tooltipMetricRight
          }`}
        >
          <StackBarTooltip tooltipData={tooltipData} />
        </Tooltip>
      )}
    </div>
  );
};

export { PlotStackBar };
