import { AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal, scaleTime } from "@visx/scale";
import { BarStack } from "@visx/shape";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { curveMonotoneX, LinePath, localPoint, Tooltip } from "@visx/visx";
import { extent, max, min } from "d3-array";
import React, { useCallback, useMemo, useState } from "react";
import { GraphMetric, TooltipData, ToolTipDateValue } from "./base";
import { useStyles } from "./styles";
import {
  bisectBarDate,
  bisectDate,
  bisectorValue,
  getBarDateNum,
  getDateNum,
  getDateNumber,
  getValueNum,
  getValueStr,
} from "./utils";

export interface StackBarMetric {
  date: string;
  pass: string;
  fail: string;
}
type StackName = "pass" | "fail";

const openSeries: GraphMetric[] = [
  {
    metricName: "probe success",
    data: [
      { date: 10, value: 100 },
      { date: 20, value: 10 },
      { date: 30, value: 1 },
      { date: 40, value: 20 },
      { date: 50, value: 10 },
      { date: 60, value: 15 },
      { date: 70, value: 30 },
      { date: 80, value: 30 },
      { date: 90, value: 30 },
      { date: 100, value: 30 },
      { date: 110, value: 30 },
      { date: 120, value: 30 },
      { date: 130, value: 30 },
      { date: 140, value: 30 },
      { date: 150, value: 30 },
    ],
    baseColor: "#5469D4",
  },
];

const barData: StackBarMetric[] = [
  {
    date: "10",
    pass: "100",
    fail: "0",
  },
  {
    date: "20",
    pass: "60",
    fail: "40",
  },
  {
    date: "30",
    pass: "60",
    fail: "40",
  },
  {
    date: "40",
    pass: "60",
    fail: "40",
  },
  {
    date: "50",
    pass: "10",
    fail: "90",
  },
  {
    date: "60",
    pass: "40",
    fail: "60",
  },
  {
    date: "70",
    pass: "10",
    fail: "90",
  },
  {
    date: "80",
    pass: "10",
    fail: "90",
  },
  {
    date: "90",
    pass: "10",
    fail: "90",
  },
  {
    date: "100",
    pass: "10",
    fail: "90",
  },
  {
    date: "110",
    pass: "10",
    fail: "90",
  },
  {
    date: "110",
    pass: "10",
    fail: "90",
  },
  {
    date: "120",
    pass: "10",
    fail: "90",
  },
  {
    date: "130",
    pass: "10",
    fail: "90",
  },
  {
    date: "140",
    pass: "10",
    fail: "90",
  },
  {
    date: "150",
    pass: "10",
    fail: "90",
  },
];
export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

const purple1 = "#00CC9A";
const purple2 = "#F2536D";
export const purple3 = "#a44afe";
export const background = "#eaedff";
const defaultMargin = { top: 40, right: 50, bottom: 20, left: 50 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

const filteredBarSeries = barData;
const keys = Object.keys(filteredBarSeries[0]).filter(
  (d) => d !== "date"
) as StackName[];

const temperatureTotals = filteredBarSeries.reduce((allTotals, currentDate) => {
  const totalTemperature = keys.reduce((dailyTotal, k) => {
    dailyTotal += Number(currentDate[k]);
    return dailyTotal;
  }, 0);
  allTotals.push(totalTemperature);
  return allTotals;
}, [] as number[]);

// accessors
const getDate = (d: StackBarMetric) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: filteredBarSeries.map(getDate),
  padding: 0.5,
});
const temperatureScale = scaleLinear<number>({
  domain: [0, Math.max(...temperatureTotals)],
  nice: true,
});
const colorScale = scaleOrdinal<StackName, string>({
  domain: keys,
  range: [purple1, purple2],
});

let tooltipTimeout: number;

const PlotStackBar = ({
  width,
  height,
  margin = defaultMargin,
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
  const [filteredOpenSeries, setfilteredOpenSeries] = useState(openSeries);
  const [firstMouseEnterGraph, setMouseEnterGraph] = useState(false);
  const classes = useStyles({
    width,
    height,
  });
  const [mouseY, setMouseY] = useState(0);

  const [dataRender, setAutoRender] = useState(true);

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(
          filteredOpenSeries
            ? filteredOpenSeries
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
        domain: [
          min(
            (openSeries
              ? openSeries
                  .map((linedata) => linedata.data)
                  .reduce((rec, d) => rec.concat(d), [])
              : [{ date: NaN, value: NaN }]
            ).concat([{ date: new Date().getTime(), value: 0 }]),
            getValueNum
          ) || 0,
          max(
            openSeries
              ? openSeries
                  .map((linedata) => linedata.data)
                  .reduce((rec, d) => rec.concat(d), [])
              : [{ date: NaN, value: NaN }],
            getValueNum
          ) || 1,
        ],
        nice: true,
      }),
    [yMax]
  );

  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);

  //
  // tooltip handler

  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      let pointerDataSelection: ToolTipDateValue[] = [
        {
          metricName: "",
          data: { date: NaN, value: NaN, value2: undefined },
          baseColor: "",
        },
      ];
      if (true) {
        let { x, y } = localPoint(event) || { x: 0, y: 0 };
        x -= margin.left;
        y -= margin.top;
        const x0 = xScale.invert(x);
        if (true) {
          setMouseY(y);
        }
        const y0: number = xScale.invert(y).valueOf();
        if (firstMouseEnterGraph === false) {
          setMouseEnterGraph(true);
        }
        let i = 0;

        if (filteredOpenSeries) {
          for (let j = 0; j < filteredOpenSeries.length; j++) {
            const indexer = bisectDate(filteredOpenSeries[j].data, x0, 1);
            const dd0 = filteredOpenSeries[j]?.data[indexer - 1] ?? undefined;
            const dd1 = filteredOpenSeries[j]?.data[indexer] ?? undefined;

            if (dd1) {
              pointerDataSelection[i] =
                x0.valueOf() - getDateNum(dd0).valueOf() >
                getDateNum(dd1).valueOf() - x0.valueOf()
                  ? {
                      metricName: filteredOpenSeries[j].metricName,
                      data: {
                        date: dd1.date,
                        value: dd1.value,
                        value2: undefined,
                      },
                      baseColor: filteredOpenSeries[j].baseColor ?? "red",
                    }
                  : {
                      metricName: filteredOpenSeries[j].metricName,
                      data: {
                        date: dd0.date,
                        value: dd0.value,
                        value2: undefined,
                      },
                      baseColor: filteredOpenSeries[j].baseColor ?? "red",
                    };
              i++;
            }
          }
        }
        if (filteredBarSeries) {
          const indexer = bisectBarDate(filteredBarSeries, x0, 1);
          const dd0 = filteredBarSeries[indexer - 1] ?? undefined;
          const dd1 = filteredBarSeries[indexer] ?? undefined;

          if (dd1) {
            pointerDataSelection[i] =
              x0.valueOf() - getBarDateNum(dd0).valueOf() >
              getBarDateNum(dd1).valueOf() - x0.valueOf()
                ? {
                    metricName: "BarSeries",
                    data: { date: dd1.date, value: dd1.pass, value2: dd1.fail },
                    baseColor: "red",
                  }
                : {
                    metricName: "BarSeries",
                    data: { date: dd0.date, value: dd0.pass, value2: dd0.fail },
                    baseColor: "red",
                  };
            i++;
          }
        }

        pointerDataSelection = pointerDataSelection.sort((a, b) =>
          a.data.date > b.data.date ? 1 : -1
        );
        const firstToolTipData = pointerDataSelection[0];
        pointerDataSelection = pointerDataSelection.filter(
          (elem) =>
            elem.data &&
            firstToolTipData.data &&
            elem.data.date <= firstToolTipData.data.date
        );

        pointerDataSelection = pointerDataSelection.sort((a, b) =>
          a.data.value > b.data.value ? 1 : -1
        );

        if (!true) {
          let index0 = 0;
          let closestValue: number | undefined;
          if (pointerDataSelection && pointerDataSelection[0]) {
            index0 = bisectorValue(pointerDataSelection, y0, 1);
            const dd0 = pointerDataSelection[index0]?.data ?? undefined;
            const dd1 = pointerDataSelection[index0 - 1]?.data ?? undefined;
            if (dd1 && dd0) {
              closestValue =
                Math.abs(y0.valueOf() - getValueNum(dd0)) >
                Math.abs(y0.valueOf() - getValueNum(dd1))
                  ? getValueNum(dd1)
                  : getValueNum(dd0);
            } else if (dd1 && !dd0) {
              closestValue = getValueNum(dd1);
            } else if (dd0 && !dd1) {
              closestValue = getValueNum(dd0);
            }
            pointerDataSelection = pointerDataSelection.filter(
              (lineData) => closestValue && lineData.data.value === closestValue
            );
          }
        }
      }
      if (width < 10) return null;
      const tooltipLeftValue =
        pointerDataSelection[0] && pointerDataSelection[0].data
          ? xScale(getDateNum(pointerDataSelection[0].data))
          : xScale(xMax);
      const tooltipTopValue =
        pointerDataSelection[0] && pointerDataSelection[0].data
          ? yScale(getValueNum(pointerDataSelection[0].data))
          : 0;

      showTooltip({
        tooltipData: pointerDataSelection,
        tooltipLeft: tooltipLeftValue,
        tooltipTop: yMax / 2,
      });
    },

    [
      width,
      xScale,
      xMax,
      yScale,
      showTooltip,
      yMax,
      margin.left,
      margin.top,
      firstMouseEnterGraph,
      filteredOpenSeries,
    ]
  );

  if (width < 10) return null;
  if (tooltipData && tooltipData[0]) {
    console.log("tooltip", tooltipData);
  }
  return width < 10 ? null : (
    <div style={{ position: "relative", margin: "1rem" }}>
      <svg
        ref={containerRef}
        width={width}
        height={height}
        onMouseLeave={() => hideTooltip()}
      >
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
        <defs>
          <clipPath id="round-corner">
            <rect x="0" y="0" width="10" height="56" rx="5" ry="5" />
          </clipPath>
        </defs>
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={temperatureScale}
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
                      rx={
                        parseInt(bar.bar.data.pass, 10) < 100 &&
                        bar.key === "fail"
                          ? "10"
                          : "0"
                      }
                      ry={
                        parseInt(bar.bar.data.pass, 10) < 100 &&
                        bar.key === "fail"
                          ? "10"
                          : "0"
                      }
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      // x={bar.x}
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
          {openSeries &&
            openSeries.length > 0 &&
            openSeries.map((linedata: GraphMetric, index) => (
              <Group key={`closedSeriesGroup-${linedata.metricName}-${index}`}>
                <LinePath
                  data={linedata.data}
                  x={(d) => xScale(getDateNum(d)) ?? 0}
                  y={(d) => yScale(getValueNum(d)) ?? 0}
                  strokeWidth={2}
                  stroke={linedata.baseColor ?? "red"}
                  strokeOpacity={0.7}
                  curve={curveMonotoneX}
                />
                {true &&
                  linedata.data.map((d, index) => (
                    <g
                      key={`dataPoint-${d.date}-${d.value}-${linedata.metricName}-${index}`}
                    >
                      <circle
                        cx={xScale(getDateNum(d))}
                        cy={yScale(getValueNum(d))}
                        r={7}
                        filter="url(#inset)"
                        fill={linedata.baseColor ?? "#5469D4"}
                        fillOpacity={1}
                        pointerEvents="none"
                      />
                    </g>
                  ))}
              </Group>
            ))}
        </Group>
        <Group>
          <rect
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            rx={14}
            onMouseMove={handleTooltip}
            fill={"transparent"}
          />
        </Group>

        <AxisBottom
          numTicks={width > 520 ? 6 : 5}
          top={yMax + margin.top}
          left={margin.left}
          scale={xScale}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={() => ({
            fill: purple3,
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>
      {tooltipData && tooltipData[0] && (
        <Tooltip
          left={tooltipLeft}
          top={tooltipTop}
          // Hardcoded value for tooltip
          // will be removed later
          className={`${classes.tooltipMetric} ${
            xMax - tooltipLeft < 180
              ? classes.tooltipMetricLeft
              : classes.tooltipMetricRight
          }`}
        >
          {tooltipData.map((linedata, index) => (
            <div key={`tooltipName-value- ${linedata.metricName}-${index}`}>
              <div className={classes.tooltipData}>
                <div className={classes.tooltipLabel}>
                  <div
                    className={classes.legendMarker}
                    style={{ background: linedata.baseColor ?? "red" }}
                  />
                  <span>{`${linedata.metricName}`}</span>
                </div>
                <div className={classes.tooltipValue}>
                  <span>{`${getValueStr(linedata.data)}`}</span>
                </div>
              </div>
            </div>
          ))}
        </Tooltip>
      )}
    </div>
  );
};

export { PlotStackBar };
