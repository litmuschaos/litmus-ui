import { useTheme } from "@material-ui/core";
import {
  AxisBottom,
  AxisLeft,
  BarStack,
  curveMonotoneX,
  Grid,
  Group,
  LinePath,
  localPoint,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  Tooltip,
  useTooltip,
} from "@visx/visx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarDateValue,
  BarStackChildProps,
  StackBarMetric,
  StackBarTooltipProps,
  TooltipData,
  ToolTipDateValue,
} from "./base";
import { useStyles } from "./styles";
import {
  bisectBarDate,
  bisectLineDate,
  dateFormat,
  getBarDateNum,
  getDateNumber,
  getLineDateNum,
  getValueNum,
  getValueStr,
  intToString,
} from "./utils";

// StackName as per our usecase
type StackName = "passPercentage" | "failPercentage";

// Default margin
const defaultMargin = { top: 20, right: 50, bottom: 30, left: 80 };

// Array of StackNames
const keys: StackName[] = ["passPercentage", "failPercentage"];

// accessors
const getDateStr = (d: StackBarMetric) => d.date.toString();

const PlotStackBar = ({
  width,
  height,
  initialxAxisDate,
  margin = defaultMargin,
  xAxistimeFormat = "MMM D,YYYY ",
  unit = "%",
  yLabel = "",
  yLabelOffset = 0,
  handleBarClick,
  barSeries,
  openSeries,
  StackBarTooltip = ({ tooltipData }: StackBarTooltipProps) => {
    // Default tooltip defined
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
}: BarStackChildProps) => {
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    tooltipOpen: true,
  });

  // Get usestyles
  const classes = useStyles({
    width,
    height,
  });
  const { palette } = useTheme();

  // User click and selects the a particular par
  // state of that bar needs to be stored
  const [currentSelectedBar, setCurrentSelectedBar] = useState<
    number | undefined
  >();

  // Color scale
  const colorScale = scaleOrdinal<StackName, string>({
    // Domain corresponds to types of bar (pass & fail)
    domain: keys,
    // Range corresponds to color to the types of bar
    range: [
      palette.status.experiment.completed,
      palette.status.experiment.failed,
    ],
  });

  // Date scale, all the bars must have padding in between them
  const dateScale = scaleBand<string>({
    domain: barSeries.map(getDateStr),
    padding: 0.5,
  });

  // Styling for the left axis ticks
  const axisLeftTickLabelProps = {
    dy: "0.3rem",
    dx: "-0.3rem",
    fontWeight: 400,
    fontSize: "10px",
    textAnchor: "end" as const,
    lineHeight: "12px",
    fill: palette.text.hint,
  };

  // Styling for the bottom axis ticks
  const axisBottomTickLabelProps = {
    dy: "0.3rem",
    textAnchor: "middle" as const,
    fontSize: "12px",
    fontWeight: 400,
    fill: palette.text.hint,
    lineHeight: "12px",
  };

  // Styling for the y label
  const yLabelProps = {
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "12px",
    color: palette.text.hint,
    fill: palette.text.hint,
  };
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Computation of minimum Date Difference

  // value initized with the difference of first two dates
  // 50 is the fall back value for cases where the series has only one or no entry
  let minimumDateDifference: number =
    barSeries[0] && barSeries[1] ? barSeries[1].date - barSeries[0].date : 50;
  if (barSeries) {
    for (let i = 1; i < barSeries.length - 1; i++) {
      if (minimumDateDifference > barSeries[i].date - barSeries[i - 1].date) {
        minimumDateDifference = barSeries[i].date - barSeries[i - 1].date;
      }
    }
  }

  // Calculate the initial or the first point in the x-axis
  let localInitialxAxisDate = 0;
  if (barSeries.length > 0) {
    if (initialxAxisDate) {
      // if initail date is provide by the user
      localInitialxAxisDate = initialxAxisDate;
    } else {
      // if user doesn't provide initial date
      // then the first point on x-axis is the first metric point of the barData
      // minus half of the minimumDateDifference calculated
      localInitialxAxisDate = barSeries[0].date - minimumDateDifference / 2;
    }
  }

  let localEndxAxisDate = 0;
  if (barSeries.length > 0) {
    // The last point on x-axis is the first metric point of the barData
    // plus half of the minimumDateDifference calculated
    localEndxAxisDate =
      barSeries[barSeries.length - 1].date + minimumDateDifference / 2;
  }

  // Open series data are appended with last and first date as caculated above
  const openSeriesDates = openSeries
    ? openSeries.data
        .map((element) => element.date)
        .concat(localInitialxAxisDate)
        .concat(localEndxAxisDate)
    : [localInitialxAxisDate, localEndxAxisDate];

  // x axis scale
  const xScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        //  Domain needs min and max date
        // this should involve both barSeries data and open series data
        domain: [
          new Date(
            Math.min(
              ...barSeries.map((element) => element.date),
              ...openSeriesDates
            )
          ),
          new Date(
            Math.max(
              ...barSeries.map((element) => element.date),
              ...openSeriesDates
            )
          ),
        ],
      }),
    [barSeries, openSeriesDates, xMax]
  );

  // Y scale
  // here the domain is set to be 0-100 as we are having
  // graph for 0% to 100% always
  // hardcoded as per usecase
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, 100],
        nice: true,
      }),
    [yMax]
  );

  // used to set the range of the scale to the specified two-element array
  dateScale.rangeRound([0, xMax]);

  // Here the smallest differnce in date is added to
  // the date of the first element and then inverted on the xScale
  // to find the bar width in px
  const barWidth = Math.min(
    (xScale(new Date(xScale.domain()[0]).getTime() + minimumDateDifference) *
      2) /
      5,
    60
  );

  // tooltip handler
  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      // Initialize pointerData slection, used to toolip
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

      // Get localPoint, mouse pointer location x
      let { x } = localPoint(event) || { x: 0 };
      x -= margin.left;

      // Get the x date by converting mouse pointer location in px to date
      const x0 = xScale.invert(x);
      let i = 0;

      // clear date
      pointerDataSelection.slice(0);

      // if openSeries is defined
      if (openSeries) {
        // bisect the metric from using the date value as per mouse
        // pointer location
        const indexer = bisectLineDate(openSeries.data, x0, 1);

        // dd0 is the immediate left metric point of dd2
        const dd0 = openSeries.data[indexer - 1] ?? undefined;
        const dd1 = openSeries.data[indexer] ?? undefined;

        // if dd0 is defined
        // then get the point which is closed to the mouse pointer
        // and append it in the tooltip date
        if (dd0) {
          pointerDataSelection[i] =
            dd1 &&
            x0.valueOf() - getLineDateNum(dd0).valueOf() >
              getLineDateNum(dd1).valueOf() - x0.valueOf()
              ? {
                  // metric name is hard coded
                  // name to be used for the tooltip
                  metricName: "resiliencyScore",
                  data: {
                    date: dd1.date,
                    value: dd1.value,
                  },
                  baseColor:
                    openSeries.baseColor ?? palette.status.experiment.running,
                }
              : {
                  metricName: "resiliencyScore",
                  data: {
                    date: dd0.date,
                    value: dd0.value,
                  },
                  baseColor:
                    openSeries.baseColor ?? palette.status.experiment.running,
                };
          i++;
        }
      }

      // check if barSeries is defined
      if (barSeries) {
        // bisect step remain same
        const indexer = bisectBarDate(barSeries, x0, 1);
        const dd0 = barSeries[indexer - 1] ?? undefined;
        const dd1 = barSeries[indexer] ?? undefined;

        // this step is for pass count
        if (dd0) {
          pointerDataSelection[i] =
            dd1 &&
            x0.valueOf() - getBarDateNum(dd0).valueOf() >
              getBarDateNum(dd1).valueOf() - x0.valueOf()
              ? {
                  metricName: "passCount",
                  data: {
                    date: dd1.date,
                    id: dd1.id,
                    value: dd1.passCount,
                  },
                  baseColor: "red",
                }
              : {
                  metricName: "passCount",
                  data: {
                    date: dd0.date,
                    id: dd0.id,
                    value: dd0.passCount,
                  },
                  baseColor: "red",
                };
          i++;
        }

        // this step is for fail count
        if (dd0) {
          pointerDataSelection[i] =
            dd1 &&
            x0.valueOf() - getBarDateNum(dd0).valueOf() >
              getBarDateNum(dd1).valueOf() - x0.valueOf()
              ? {
                  metricName: "failCount",
                  data: {
                    date: dd1.date,
                    id: dd1.id,
                    value: dd1.failCount,
                  },
                  baseColor: "red",
                }
              : {
                  metricName: "failCount",
                  data: {
                    date: dd0.date,
                    id: dd0.id,
                    value: dd0.failCount,
                  },
                  baseColor: "red",
                };
          i++;
        }
      }

      // Get the first point added in the tooltip
      const firstToolTipData = pointerDataSelection[0];

      // Filter all the pointerDataSelection based on the first point added
      // this is done so that all the data in the tooltip have same date
      pointerDataSelection = pointerDataSelection.filter(
        (elem) =>
          elem.data &&
          firstToolTipData.data &&
          elem.data.date <= firstToolTipData.data.date
      );

      // Not render graph if width is less than certain limit
      if (width < 10) return null;

      // Get left position of the tooltip in px
      const tooltipLeftValue =
        pointerDataSelection[pointerDataSelection.length - 1] &&
        pointerDataSelection[0].data
          ? xScale(getLineDateNum(pointerDataSelection[0].data))
          : xScale(xMax);
      // xScale(xMax) is a fall back

      // Set tooltip date
      showTooltip({
        tooltipData: pointerDataSelection,
        tooltipLeft: tooltipLeftValue,
        // Tooltip top location is always fixed as yMax/2
        tooltipTop: yMax / 2,
      });
    },

    [
      width,
      xScale,
      xMax,
      showTooltip,
      yMax,
      margin.left,
      openSeries,
      barSeries,
      palette,
    ]
  );

  // If data is changed in real-time then the selection of a bar (user click) is reset
  useEffect(() => {
    setCurrentSelectedBar(undefined);
  }, [barSeries]);

  if (width < 10) return null;

  return width < 10 ? null : (
    <div className={classes.root}>
      {/* Construct svg */}
      <svg width={width} height={height} onMouseLeave={() => hideTooltip()}>
        {/* Plot background rect */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={"white"}
          rx={14}
        />

        {/* Construct filter for the bin */}
        <defs>
          <filter id="inset" x="-50%" y="-50%" width="200%" height="200%">
            <feFlood
              floodColor={
                openSeries?.baseColor ?? palette.status.experiment.running
              }
              result="outside-color"
            />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1" />
            <feComposite
              in="outside-color"
              operator="in"
              result="outside-stroke"
            />
            <feFlood
              floodColor={palette.background.paper}
              result="inside-color"
            />
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

        {/* Plot a grid */}
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          stroke={palette.border.main}
          strokeOpacity={0.1}
        />

        {/* Plot a left axis */}
        <AxisLeft
          scale={yScale}
          numTicks={height > 200 ? 7 : 6}
          hideAxisLine
          hideTicks
          tickFormat={(num) => intToString(num.valueOf(), unit)}
          tickLabelProps={() => axisLeftTickLabelProps}
          label={yLabel}
          labelProps={yLabelProps}
          left={margin.left}
          labelOffset={yLabelOffset}
          top={margin.top}
        />

        {/* Plot a bottom axis */}
        <AxisBottom
          numTicks={width > 520 ? 6 : 5}
          hideTicks
          top={yMax + margin.top}
          left={margin.left}
          scale={xScale}
          stroke={palette.border.main}
          tickStroke={palette.text.primary}
          tickFormat={(num) => dateFormat(num.valueOf(), xAxistimeFormat)}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
        <Group top={margin.top} left={margin.left}>
          <BarStack<StackBarMetric, StackName>
            data={barSeries}
            keys={keys}
            x={getDateStr}
            xScale={dateScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  return (
                    // Plot rect
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={xScale(bar.bar.data.date ?? 0) - barWidth / 2}
                      y={bar.y}
                      height={bar.height}
                      width={barWidth}
                      // Opacity is set as per user selection of a bar
                      opacity={
                        currentSelectedBar
                          ? currentSelectedBar === bar.bar.data.date
                            ? 1
                            : 0.3
                          : tooltipData && tooltipData[0]
                          ? getDateNumber(bar.bar.data.date) ===
                            getDateNumber(tooltipData[0].data.date)
                            ? 1
                            : 0.5
                          : 1
                      }
                      fill={bar.color}
                    />
                  );
                })
              )
            }
          </BarStack>

          {/* Plot open series */}
          {openSeries && (
            <Group>
              {/* Draw a line path */}
              <LinePath
                data={openSeries.data}
                x={(d) => xScale(getLineDateNum(d)) ?? 0}
                y={(d) => yScale(getValueNum(d)) ?? 0}
                strokeWidth={2}
                // experiment.running color is fallback color
                stroke={
                  openSeries.baseColor ?? palette.status.experiment.running
                }
                strokeOpacity={0.7}
                curve={curveMonotoneX}
              />

              {openSeries.data.map((d: BarDateValue, index) => (
                <g
                  key={`dataPoint-${d.date}-${d.value}-${openSeries.metricName}-${index}`}
                >
                  {/* add points for every data point */}
                  <circle
                    cx={xScale(getLineDateNum(d))}
                    cy={yScale(getValueNum(d))}
                    r={8}
                    filter="url(#inset)"
                    fill={
                      openSeries.baseColor ?? palette.status.experiment.running
                    }
                    // Opacity as per user hover and click
                    fillOpacity={
                      currentSelectedBar
                        ? currentSelectedBar === d.date
                          ? 1
                          : 0.3
                        : tooltipData && tooltipData[0]
                        ? getDateNumber(d.date) ===
                          getDateNumber(tooltipData[0].data.date)
                          ? 1
                          : 0.5
                        : 1
                    }
                    pointerEvents="none"
                  />
                </g>
              ))}
            </Group>
          )}
        </Group>
        <Group>
          {/* transparent overlay to detect user hover */}
          {/* its required to have one single svg element using which  */}
          {/* is used to get the mouse pointer location in px   */}
          <rect
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            onMouseMove={handleTooltip}
            fill={"transparent"}
            //  When user is clicks
            // the mouse hover tooltip point is stored for
            // changing the opacity
            onClick={() => {
              if (
                tooltipData &&
                currentSelectedBar !==
                  tooltipData[tooltipData.length - 1].data.date
              ) {
                setCurrentSelectedBar(
                  tooltipData[tooltipData.length - 1].data.date
                );
                handleBarClick?.(
                  tooltipData
                    ? tooltipData[tooltipData.length - 1].data.id ?? null
                    : null
                );
              } else {
                setCurrentSelectedBar(undefined);
                handleBarClick?.("");
              }
            }}
          />
        </Group>
      </svg>
      {tooltipData && tooltipData[0] && (
        // Tooltip as per user hover
        // Tooltip can be replaced with TooltipWithBound
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
