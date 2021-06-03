import { AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal, scaleTime } from "@visx/scale";
import { BarStack } from "@visx/shape";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { curveMonotoneX, LinePath, localPoint } from "@visx/visx";
import { extent, max, min } from "d3-array";
import React, { useCallback, useMemo, useState } from "react";
import { GraphMetric, TooltipData, ToolTipDateValue } from "./base";
import { bisectDate, bisectorValue, getDateNum, getValueNum } from "./utils";

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
      { date: 15, value: 100 },
      { date: 20, value: 10 },
      { date: 30, value: 1 },
      { date: 40, value: 20 },
      { date: 45, value: 10 },
      { date: 70, value: 30 },
    ],
    baseColor: "orange",
  },
];

const barData: StackBarMetric[] = [
  {
    date: "10",
    pass: "60",
    fail: "40",
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
];
export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

const purple1 = "lightGreen";
const purple2 = "red";
export const purple3 = "#a44afe";
export const background = "#eaedff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

const data = barData;
const keys = Object.keys(data[0]).filter((d) => d !== "date") as StackName[];

const temperatureTotals = data.reduce((allTotals, currentDate) => {
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
  domain: data.map(getDate),
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
  events = false,
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
  const [mouseY, setMouseY] = useState(0);

  const [dataRender, setAutoRender] = useState(true);

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });
  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

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
        { metricName: "", data: { date: NaN, value: NaN }, baseColor: "" },
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
                      data: dd1,
                      baseColor: filteredOpenSeries[j].baseColor,
                    }
                  : {
                      metricName: filteredOpenSeries[j].metricName,
                      data: dd0,
                      baseColor: filteredOpenSeries[j].baseColor,
                    };
              i++;
            }
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
        tooltipTop: tooltipTopValue,
      });
    },

    [
      width,
      xScale,
      xMax,
      yScale,
      showTooltip,
      margin.left,
      margin.top,
      firstMouseEnterGraph,
      filteredOpenSeries,
    ]
  );

  if (width < 10) return null;
  if (tooltipData && tooltipData[0]) {
    console.log("tooltip", tooltipData[0].data.date);
  }
  return width < 10 ? null : (
    <div style={{ position: "relative" }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={"white"}
          rx={14}
          onMouseMove={(e) => console.log("mouve", e.movementX, e.movementY)}
        />
        <defs>
          <filter id="inset" x="-50%" y="-50%" width="200%" height="200%">
            <feFlood floodColor="red" result="outside-color" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="2" />
            <feComposite
              in="outside-color"
              operator="in"
              result="outside-stroke"
            />

            <feFlood floodColor="white" result="inside-color" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="inside-stroke"
            />

            <feMorphology in="SourceAlpha" radius="5" />
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
          yScale={temperatureScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
        />
        <Group top={margin.top}>
          <BarStack<StackBarMetric, StackName>
            data={data}
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
                      // x={bar.x}
                      x={
                        (xScale(parseInt(bar.bar.data.date, 10)) ?? 0) -
                        bar.width / 2
                      }
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
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
                  stroke={linedata.baseColor}
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
                        fill={linedata.baseColor}
                        fillOpacity={0.7}
                        pointerEvents="none"
                        filter="url(#inset)"
                      />
                    </g>
                  ))}
              </Group>
            ))}
        </Group>
        <Group>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            rx={14}
            onMouseMove={handleTooltip}
            fill={"transparent"}
          />
        </Group>

        <AxisBottom
          top={yMax + margin.top}
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
    </div>
  );
};

export { PlotStackBar };
