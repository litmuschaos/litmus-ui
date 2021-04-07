import { useTheme } from "@material-ui/core";
import { Bounds } from "@visx/brush/lib/types";
import {
  Brush,
  Line,
  LinearGradient,
  localPoint,
  scaleLinear,
  scaleTime,
  Tooltip,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from "@visx/visx";
import { bisector, extent, max, min } from "d3-array";
import dayjs from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import { LegendData } from "../LegendTable";
import { LegendTable } from "../LegendTable/LegendTable";
import { DateValue, LineAreaGraphChildProps, ToolTip } from "./base";
import { PlotLineAreaGraph } from "./PlotLineAreaGraph";
import { useStyles } from "./styles";

type ToolTipDateValue = ToolTip<DateValue>;
type TooltipData = Array<ToolTipDateValue>;
let dd1: DateValue;
let dd0: DateValue;
let i: number;
let j: number;
let indexer: number;
let toolTipPointLength: number;

// Accessor functions
const getDateNum = (d: DateValue) => {
  if (d) {
    if (typeof d.date === "number") {
      return new Date(d.date);
    } else return new Date(parseInt(d.date, 10));
  } else {
    return new Date(0);
  }
};

const getValueNum = (d: DateValue) => {
  if (d) {
    if (typeof d.value === "number") {
      return d.value;
    } else return parseInt(d.value, 10);
  } else {
    return NaN;
  }
};

const getValueStr = (d: DateValue) => {
  if (d) {
    if (typeof d.value === "number") {
      return d.value.toFixed(2).toString();
    } else return d.value;
  } else {
    return "";
  }
};

// Bisectors
const bisectDate = bisector<DateValue, Date>((d) => new Date(getDateNum(d)))
  .left;
const bisectorValue = bisector<ToolTipDateValue, number>((d) =>
  getValueNum(d.data)
).left;

const chartSeparation = 10;
let legenTablePointerData: Array<ToolTipDateValue>;
let eventTableData: Array<LegendData> = [{ data: ["--", "--"], baseColor: "" }];

const ComputationGraph: React.FC<LineAreaGraphChildProps> = ({
  compact = false,
  closedSeries,
  openSeries,
  eventSeries,
  showTips = true,
  showLegendTable = true,
  showEventTable = false,
  widthPercentageEventTable = 40,
  marginLeftEventTable = 50,
  width = 200,
  height = 200,
  margin = {
    top: 20,
    left: 30,
    bottom: 20,
    right: 10,
  },
  legendTableHeight = 200,
  toolTiptimeFormat = "MMM D,YYYY h:mm:ss a",
  showPoints = true,
  ...rest
}) => {
  const { palette } = useTheme();
  const classes = useStyles({
    width,
    height,
    legendTableHeight,
    widthPercentageEventTable,
    marginLeftEventTable,
    showLegendTable,
    showEventTable,
  });
  const [filteredClosedSeries, setFilteredSeries] = useState(closedSeries);
  const [filteredOpenSeries, setfilteredOpenSeries] = useState(openSeries);
  const [filteredEventSeries, setfilteredEventSeries] = useState(eventSeries);
  const [firstMouseEnterGraph, setMouseEnterGraph] = useState(false);
  const [dataRender, setAutoRender] = useState(true);

  let legenddata: Array<LegendData> = [{ data: [], baseColor: "" }];

  const closedSeriesCount = filteredClosedSeries
    ? filteredClosedSeries.length
    : 0;

  const eventSeriesCount = filteredEventSeries ? filteredEventSeries.length : 0;

  const onBrushChange = useCallback(
    (domain: Bounds | null) => {
      if (!domain) return;
      setAutoRender(false);
      const { x0, x1 } = domain;
      if (filteredClosedSeries) {
        const seriesCopy = filteredClosedSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x > x0 && x < x1;
            })
          )
          .map((linedata, i) => ({
            metricName: filteredClosedSeries[i].metricName,
            data: linedata,
            baseColor: filteredClosedSeries[i].baseColor,
          }));

        setFilteredSeries(seriesCopy);
      }

      if (filteredOpenSeries) {
        const seriesCopy = filteredOpenSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x > x0 && x < x1;
            })
          )
          .map((linedata, i) => ({
            metricName: filteredOpenSeries[i].metricName,
            data: linedata,
            baseColor: filteredOpenSeries[i].baseColor,
          }));

        setfilteredOpenSeries(seriesCopy);
      }
      if (filteredEventSeries) {
        const seriesCopy = filteredEventSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x > x0 && x < x1;
            })
          )
          .map((linedata, i) => ({
            metricName: filteredEventSeries[i].metricName,
            data: linedata,
            subData: filteredEventSeries[i].subData,
            baseColor: filteredEventSeries[i].baseColor,
          }));

        setfilteredEventSeries(seriesCopy);
      }
    },
    [filteredClosedSeries, filteredOpenSeries, filteredEventSeries]
  );

  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = compact
    ? chartSeparation / 2
    : chartSeparation + 10;
  const topChartHeight = innerHeight - topChartBottomMargin;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);

  // scales

  const dateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(
          (filteredClosedSeries
            ? filteredClosedSeries
                .map((linedata) => linedata.data)
                .reduce((rec, d) => rec.concat(d), [])
            : [{ date: NaN, value: NaN }]
          )
            .concat(
              filteredOpenSeries
                ? filteredOpenSeries
                    .map((linedata) => linedata.data)
                    .reduce((rec, d) => rec.concat(d), [])
                : [{ date: NaN, value: NaN }]
            )
            .concat(
              filteredEventSeries
                ? filteredEventSeries
                    .map((linedata) => linedata.data)
                    .reduce((rec, d) => rec.concat(d), [])
                : [{ date: NaN, value: NaN }]
            ),
          getDateNum
        ) as [Date, Date],
      }),
    [xMax, filteredClosedSeries, filteredOpenSeries, filteredEventSeries]
  );
  const valueScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [
          min(
            (filteredClosedSeries
              ? filteredClosedSeries
                  .map((linedata) => linedata.data)
                  .reduce((rec, d) => rec.concat(d), [])
              : [{ date: NaN, value: NaN }]
            )
              .concat(
                filteredOpenSeries
                  ? filteredOpenSeries
                      .map((linedata) => linedata.data)
                      .reduce((rec, d) => rec.concat(d), [])
                  : [{ date: NaN, value: NaN }]
              )
              .concat([{ date: new Date().getTime(), value: 0 }]),
            getValueNum
          ) || 0,
          max(
            (filteredClosedSeries
              ? filteredClosedSeries
                  .map((linedata) => linedata.data)
                  .reduce((rec, d) => rec.concat(d), [])
              : [{ date: NaN, value: NaN }]
            ).concat(
              filteredOpenSeries
                ? filteredOpenSeries
                    .map((linedata) => linedata.data)
                    .reduce((rec, d) => rec.concat(d), [])
                : [{ date: NaN, value: NaN }]
            ),
            getValueNum
          ) || 0,
        ],
        nice: true,
      }),
    [yMax, filteredClosedSeries, filteredOpenSeries]
  );
  // Tooltip bounds detection
  const { containerRef, containerBounds } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });
  //  ToolTip Data
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    // initial tooltip state
    tooltipOpen: true,
  });

  const {
    showTooltip: showTooltipDate,
    hideTooltip: hideTooltipDate,
    tooltipData: tooltipDataDate,
    tooltipLeft: tooltipLeftDate = 0,
  } = useTooltip<TooltipData>({
    // initial tooltip state
    tooltipOpen: true,
  });

  const getSum = (total: number, num: number | string) => {
    if (typeof num === "number") {
      return total + (num || 0);
    } else {
      return total + (parseInt(num, 10) || 0);
    }
  };

  // tooltip handler

  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      let pointerDataSelection: ToolTipDateValue[] = [
        { metricName: "", data: dd0, baseColor: "" },
      ];
      if (showTips) {
        let { x, y } = localPoint(event) || { x: 0, y: 0 };
        x -= margin.left;
        y -= margin.top;
        const x0 = dateScale.invert(x);
        const y0 = valueScale.invert(y);

        if (firstMouseEnterGraph === false) {
          setMouseEnterGraph(true);
        }
        i = 0;
        if (closedSeries) {
          for (j = 0; j < closedSeries.length; j++) {
            indexer = bisectDate(closedSeries[i].data, x0, 1);
            dd0 = closedSeries[j].data[indexer - 1];
            dd1 = closedSeries[j].data[indexer];

            if (dd1) {
              pointerDataSelection[i] =
                x0.valueOf() - getDateNum(dd0).valueOf() >
                getDateNum(dd1).valueOf() - x0.valueOf()
                  ? {
                      metricName: closedSeries[i].metricName,
                      data: dd1,
                      baseColor: closedSeries[i].baseColor,
                    }
                  : {
                      metricName: closedSeries[i].metricName,
                      data: dd0,
                      baseColor: closedSeries[i].baseColor,
                    };
              i++;
            }
          }
        }
        if (openSeries) {
          for (j = 0; j < openSeries.length; j++) {
            indexer = bisectDate(openSeries[j].data, x0, 1);
            dd0 = openSeries[j].data[indexer - 1];
            dd1 = openSeries[j].data[indexer];

            if (dd1) {
              pointerDataSelection[i] =
                x0.valueOf() - getDateNum(dd0).valueOf() >
                getDateNum(dd1).valueOf() - x0.valueOf()
                  ? {
                      metricName: openSeries[j].metricName,
                      data: dd1,
                      baseColor: openSeries[j].baseColor,
                    }
                  : {
                      metricName: openSeries[j].metricName,
                      data: dd0,
                      baseColor: openSeries[j].baseColor,
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
        legenTablePointerData = JSON.parse(
          JSON.stringify(pointerDataSelection)
        );

        pointerDataSelection = pointerDataSelection.sort((a, b) =>
          a.data.value > b.data.value ? 1 : -1
        );

        let index0 = 0;
        let closestValue: number | undefined;

        index0 = bisectorValue(pointerDataSelection, y0);
        const dd00: ToolTipDateValue = pointerDataSelection[index0];
        const dd11: ToolTipDateValue = pointerDataSelection[index0 - 1];
        if (dd11 && dd00) {
          closestValue =
            Math.abs(y0.valueOf() - getValueNum(dd00.data)) >
            Math.abs(y0.valueOf() - getValueNum(dd11.data))
              ? getValueNum(dd11.data)
              : getValueNum(dd00.data);
        } else if (dd11 && !dd00) {
          closestValue = getValueNum(dd11.data);
        } else if (dd00 && !dd11) {
          closestValue = getValueNum(dd00.data);
        }
        pointerDataSelection = pointerDataSelection.filter(
          (lineData) => closestValue && lineData.data.value === closestValue
        );

        toolTipPointLength = pointerDataSelection.length;
        const eventToolTip: Array<ToolTipDateValue> = [];
        eventTableData = eventTableData.splice(0);
        let k = 0;
        if (eventSeries) {
          for (j = 0; j < eventSeries.length; j++) {
            indexer = bisectDate(eventSeries[j].data, x0, 1);
            dd0 = eventSeries[j].data[indexer - 1];
            dd1 = eventSeries[j].data[indexer];
            if (
              dd1 &&
              ((toolTipPointLength === 0 && dd1.date >= x0.valueOf()) ||
                (toolTipPointLength > 0 &&
                  dd1.date ===
                    pointerDataSelection[toolTipPointLength - 1].data.date))
            ) {
              eventToolTip[j] = {
                metricName: eventSeries[j].metricName,
                data: dd1,
                baseColor: eventSeries[j].baseColor,
              };
              legenTablePointerData[j + legenTablePointerData.length] =
                eventToolTip[j];

              if (dd1.value !== "False") {
                pointerDataSelection[i] = eventToolTip[j];
                i++;

                // Selection of the sub-data for the
                // subData Table from the eventSeries
                // on which the user is hovering
                eventTableData[k] = {
                  data: [eventSeries[j].metricName],
                  baseColor: eventSeries[j].baseColor,
                };
                k++;
                if (eventSeries[j].subData) {
                  eventSeries[j].subData?.forEach((elem) => {
                    eventTableData[k++] = {
                      data: [elem.subDataName, elem.value],
                    };
                  });
                }
              }
            } else if (
              dd0 &&
              ((toolTipPointLength === 0 && dd0.date >= x0.valueOf()) ||
                (toolTipPointLength > 0 &&
                  dd0.date ===
                    pointerDataSelection[toolTipPointLength - 1].data.date))
            ) {
              eventToolTip[j] = {
                metricName: eventSeries[j].metricName,
                data: dd0,
                baseColor: eventSeries[j].baseColor,
              };
              legenTablePointerData[j + legenTablePointerData.length] =
                eventToolTip[j];

              if (dd0.value !== "False") {
                pointerDataSelection[i] = eventToolTip[j];
                i++;

                // Selection of the sub-data for the
                // subData Table from the eventSeries
                // on which the user is hovering
                eventTableData[k] = {
                  data: [eventSeries[j].metricName],
                  baseColor: eventSeries[j].baseColor,
                };
                k++;
                if (eventSeries[j].subData) {
                  eventSeries[j].subData?.forEach((elem) => {
                    eventTableData[k++] = {
                      data: [elem.subDataName, elem.value],
                    };
                  });
                }
              }
            }
          }
        }
        pointerDataSelection = pointerDataSelection.slice(0, i);
        eventTableData = eventTableData.slice(0, k);
        // Passing hyphen if eventTableData data is empty
        if (eventTableData.length === 0) {
          eventTableData[0] = { data: ["--", "--"] };
        }
      }
      if (width < 10) return null;
      const tooltipLeftValue =
        (pointerDataSelection[0] && pointerDataSelection[0].data
          ? dateScale(getDateNum(pointerDataSelection[0].data))
          : dateScale(xMax)) -
        containerBounds.left +
        margin.left -
        margin.right;
      const tooltipTopValue =
        pointerDataSelection[0] && pointerDataSelection[0].data
          ? valueScale(getValueNum(pointerDataSelection[0].data))
          : 0;
      showTooltip({
        tooltipData: pointerDataSelection,
        tooltipLeft: tooltipLeftValue,
        tooltipTop: tooltipTopValue,
      });
      showTooltipDate({
        tooltipData: pointerDataSelection,
        tooltipLeft: tooltipLeftValue,
        tooltipTop: tooltipTopValue,
      });
    },

    [
      showTips,
      width,
      showTooltip,
      showTooltipDate,
      dateScale,
      valueScale,
      margin.left,
      margin.top,
      firstMouseEnterGraph,
      closedSeries,
      openSeries,
      eventSeries,
    ]
  );
  // legendData
  if (showLegendTable) {
    legenddata = legenddata.splice(0);

    if (filteredEventSeries) {
      filteredEventSeries.map((linedata, index) => {
        const pointerElement = legenTablePointerData
          ? legenTablePointerData.filter(
              (singleMetric) => singleMetric.metricName === linedata.metricName
            )[0]
          : undefined;
        const curr = pointerElement
          ? getValueStr(pointerElement.data)
          : firstMouseEnterGraph
          ? "--"
          : getValueStr(linedata.data[linedata.data.length - 1]);

        const avg = "--";

        if (linedata.data !== undefined) {
          legenddata[index] = {
            data: [linedata.metricName, avg, curr],
            baseColor: linedata.baseColor,
          };
        }
      });
    }
    if (filteredClosedSeries) {
      filteredClosedSeries.map((linedata, index) => {
        const pointerElement = legenTablePointerData
          ? legenTablePointerData.filter(
              (singleMetric) => singleMetric.metricName === linedata.metricName
            )[0]
          : undefined;
        const curr = pointerElement
          ? getValueStr(pointerElement.data)
          : firstMouseEnterGraph
          ? "--"
          : getValueStr(linedata.data[linedata.data.length - 1]);
        const avg = (
          linedata.data.map((d) => (d.value ? d.value : 0)).reduce(getSum, 0) /
          linedata.data.length
        )
          .toFixed(2)
          .toString();

        if (linedata.data !== undefined)
          legenddata[index + eventSeriesCount] = {
            data: [linedata.metricName, avg, curr],
            baseColor: linedata.baseColor,
          };
      });
    }

    if (filteredOpenSeries) {
      filteredOpenSeries.map((linedata, index) => {
        const pointerElement = legenTablePointerData
          ? legenTablePointerData.filter(
              (singleMetric) => singleMetric.metricName === linedata.metricName
            )[0]
          : undefined;
        const curr = pointerElement
          ? getValueStr(pointerElement.data)
          : firstMouseEnterGraph
          ? "--"
          : getValueStr(linedata.data[linedata.data.length - 1]);

        const avg = (
          linedata.data.map((d) => (d.value ? d.value : 0)).reduce(getSum, 0) /
          linedata.data.length
        )
          .toFixed(2)
          .toString();

        if (linedata.data !== undefined)
          legenddata[index + eventSeriesCount + closedSeriesCount] = {
            data: [linedata.metricName, avg, curr],
            baseColor: linedata.baseColor,
          };
      });
    }
  }

  if (
    (filteredClosedSeries !== closedSeries ||
      filteredOpenSeries !== openSeries ||
      filteredEventSeries !== eventSeries) &&
    dataRender
  ) {
    setFilteredSeries(closedSeries);
    setfilteredOpenSeries(openSeries);
    setfilteredEventSeries(eventSeries);
  }

  console.log(containerBounds.left);

  return (
    <div
      onMouseLeave={() => hideTooltipDate()}
      style={{
        width,
        height: height + legendTableHeight,
        position: "relative",
      }}
    >
      <svg
        onMouseLeave={() => hideTooltip()}
        ref={containerRef}
        width={width}
        height={height}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          className={classes.rectBase}
        />

        <PlotLineAreaGraph
          showPoints={showPoints}
          hideBottomAxis={compact}
          closedSeries={filteredClosedSeries}
          openSeries={filteredOpenSeries}
          eventSeries={filteredEventSeries}
          width={width - 20}
          height={yMax}
          margin={{ ...margin, bottom: topChartBottomMargin }}
          yMax={yMax}
          xMax={xMax}
          xScale={dateScale}
          yScale={valueScale}
          {...rest}
        >
          <LinearGradient
            id="linearGradient-Brush"
            from={palette.text.primary}
            to={palette.text.primary}
            fromOpacity={0.4}
            toOpacity={0}
          />

          <Brush
            xScale={dateScale}
            yScale={valueScale}
            width={xMax}
            height={yMax}
            margin={margin}
            handleSize={8}
            resizeTriggerAreas={["left", "right"]}
            resetOnEnd
            onBrushEnd={onBrushChange}
            onChange={() => hideTooltip()}
            selectedBoxStyle={{
              fill: "url(#linearGradient-Brush)",
              stroke: palette.text.primary,
              strokeOpacity: "0.8",
            }}
            onMouseMove={handleTooltip}
            onClick={() => {
              setFilteredSeries(closedSeries);
              setfilteredOpenSeries(openSeries);
              setfilteredEventSeries(eventSeries);
              setAutoRender(true);
            }}
          />
          {showTips && tooltipDataDate && tooltipDataDate[0] && (
            <Line
              key={`${tooltipDataDate[0].metricName}-toolTipLine`}
              from={{ x: dateScale(getDateNum(tooltipDataDate[0].data)), y: 0 }}
              to={{
                x: dateScale(getDateNum(tooltipDataDate[0].data)),
                y: yMax,
              }}
              className={classes.tooltipLine}
            />
          )}
          {showTips &&
            tooltipData &&
            toolTipPointLength >= 1 &&
            tooltipData[0] && (
              <g>
                <circle
                  cx={dateScale(getDateNum(tooltipData[0].data))}
                  cy={valueScale(getValueNum(tooltipData[0].data))}
                  r={5}
                  fill={palette.graph.toolTip}
                  fillOpacity={1}
                  stroke={palette.text.primary}
                  strokeOpacity={1}
                  strokeWidth={2}
                  pointerEvents="none"
                />
              </g>
            )}
        </PlotLineAreaGraph>
      </svg>
      {tooltipDataDate && showTips && tooltipDataDate[0] && (
        <div>
          <Tooltip
            top={yMax}
            left={tooltipLeftDate}
            className={classes.tooltipDateStyles}
          >
            <div className={`${classes.tooltipBottomDate}`}>
              <span>{` ${dayjs(
                new Date(getDateNum(tooltipDataDate[0].data))
              ).format(toolTiptimeFormat)}`}</span>
            </div>
          </Tooltip>
          {tooltipData && showTips && tooltipData[0] && (
            <TooltipWithBounds
              top={tooltipTop}
              left={tooltipLeft}
              className={classes.tooltipMetric}
            >
              {tooltipData.map((linedata) => (
                <div key={`tooltipName-value- ${linedata.metricName}`}>
                  <div className={classes.tooltipData}>
                    <div className={classes.tooltipLabel}>
                      <div
                        className={classes.legendMarker}
                        style={{ background: linedata.baseColor }}
                      />
                      <span>{`${linedata.metricName}`}</span>
                    </div>
                    <div className={classes.tooltipValue}>
                      <span>{`${getValueStr(linedata.data)}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </TooltipWithBounds>
          )}
        </div>
      )}
      {showLegendTable && showEventTable && (
        <div className={classes.wrapperParentLegendAndEventTable}>
          <div className={classes.wrapperLegendTable}>
            <LegendTable
              data={legenddata}
              heading={["Metric Name", "Avg", "Curr"]}
            />
          </div>
          <div className={classes.wrapperSubDataTableForEvents}>
            <LegendTable
              data={eventTableData}
              heading={["Chaos Metric Info", "Value"]}
            />
          </div>
        </div>
      )}
      {showLegendTable && !showEventTable && (
        <div className={classes.wrapperLegendTable}>
          <LegendTable
            data={legenddata}
            heading={["Metric Name", "Avg", "Curr"]}
          />
        </div>
      )}
    </div>
  );
};
export { ComputationGraph };
