import { useTheme } from "@material-ui/core";
import { Bounds } from "@visx/brush/lib/types";
import {
  Brush,
  Group,
  Line,
  LinearGradient,
  localPoint,
  scaleLinear,
  scaleTime,
  Tooltip,
  TooltipWithBounds,
  useTooltip,
} from "@visx/visx";
import { extent, max, min } from "d3-array";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LegendData } from "../LegendTable";
import { LegendTable } from "../LegendTable/LegendTable";
import {
  DateValue,
  LineAreaGraphChildProps,
  StrictBrushPostitionProps,
  TooltipData,
  ToolTipDateValue,
} from "./base";
import { PlotLineAreaGraph } from "./PlotLineAreaGraph";
import { SliderMui } from "./SliderMui";
import { useStyles } from "./styles";
import { TooltipMui } from "./TooltipMui";
import {
  bisectDate,
  bisectorValue,
  getDateNum,
  getSum,
  getValueNum,
  getValueStr,
} from "./utils";

let dd1: DateValue | undefined;
let dd0: DateValue | undefined;
let i: number;
let j: number;
let indexer: number;
let toolTipPointLength: number;
let legenTablePointerData: Array<ToolTipDateValue>;
let eventTableData: Array<LegendData> = [{ data: ["--", "--"], baseColor: "" }];

interface SliderLabelProps {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const ComputationGraph: React.FC<LineAreaGraphChildProps> = ({
  compact = false,
  closedSeries,
  openSeries,
  eventSeries,
  showMultiToolTip,
  showTips = true,
  showLegendTable = true,
  showEventTable = false,
  showRangeSlider = false,
  widthPercentageEventTable = 40,
  marginLeftEventTable = 50,
  width = 200,
  height = 200,
  margin = {
    top: 20,
    left: 60,
    bottom: 30,
    right: 10,
  },
  legendTableHeight = 200,
  rangeSliderHeight = 60,
  toolTiptimeFormat = "MMM D,YYYY h:mm",
  showPoints = true,
  centralBrushPosition,
  handleCentralBrushPosition,
  centralAllowGraphUpdate,
  handleCentralAllowGraphUpdate,
  ...rest
}) => {
  const { palette } = useTheme();
  // Calculate the hight of the svg (graph) depending on the
  // height of the parent and legendTable
  const svgElementHeight =
    height -
    (showLegendTable ? legendTableHeight : 0) -
    (showRangeSlider ? rangeSliderHeight : 0);

  // Deduct margins
  const topChartHeight = svgElementHeight - margin.top - margin.bottom;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);
  const classes = useStyles({
    width,
    height,
    margin,
    xMax,
    legendTableHeight,
    rangeSliderHeight,
    widthPercentageEventTable,
    marginLeftEventTable,
    showLegendTable,
    showEventTable,
    showRangeSlider,
  });

  // Label the Slider value with a tooltip
  const valueLabelComponent = (props: SliderLabelProps) => {
    const { children, open, value } = props;
    return (
      <TooltipMui
        open={open}
        enterTouchDelay={0}
        placement="bottom"
        title={` ${dayjs(new Date(value)).format(toolTiptimeFormat)}`}
      >
        {children}
      </TooltipMui>
    );
  };

  // Format the given date as per the format given by
  // toolTiptTimeFormat
  const valueLabelFormat = (value: number) => {
    return ` ${dayjs(new Date(value)).format(toolTiptimeFormat)}`;
  };

  // Intiallize state for all the metrics
  // here the term filtered before each metric
  // corresponds to the portion of metric data
  // plotted on the graph
  const [filteredClosedSeries, setFilteredClosedSeries] =
    useState(closedSeries);
  const [filteredOpenSeries, setFilteredOpenSeries] = useState(openSeries);
  const [filteredEventSeries, setFilteredEventSeries] = useState(eventSeries);

  // State for checking if the mouse has entered for the first time
  const [firstMouseEnterGraph, setMouseEnterGraph] = useState(false);

  // State used to avoid unnecessary rendering
  // TODO remove if not required
  const [dataRender, setAutoRender] = useState(true);

  // Boolean to determine the graph rentering
  // this boolean is associated with the update of the central Brush position
  const [allowGraphUpdate, setAllowGraphUpdate] = useState(
    centralAllowGraphUpdate ?? true
  );

  // Use for showing the tooltip when showMultiTooltip is disabled
  const [mouseY, setMouseY] = useState(0);

  // More format options for Dayjs
  dayjs.extend(advancedFormat);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);

  //  ToolTip Data
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    tooltipOpen: true,
  });

  // Tooltip for the date
  const {
    showTooltip: showTooltipDate,
    hideTooltip: hideTooltipDate,
    tooltipData: tooltipDataDate,
    tooltipLeft: tooltipLeftDate = 0,
  } = useTooltip<TooltipData>({
    tooltipOpen: true,
  });

  let legenddata: Array<LegendData> = [{ data: [], baseColor: "" }];

  const closedSeriesCount = filteredClosedSeries
    ? filteredClosedSeries.length
    : 0;

  const eventSeriesCount = filteredEventSeries ? filteredEventSeries.length : 0;

  // Scales for brush

  // Brush x-axis or Date scale. This scale does not change
  // even if the user zooms in/out
  // this scale is maintained to that when the user
  // zooms out the graph is reset as per this scale
  const brushDateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(
          (closedSeries
            ? closedSeries
                .map((linedata) => linedata.data)
                .reduce((rec, d) => rec.concat(d), [])
            : [{ date: NaN, value: NaN }]
          )
            .concat(
              openSeries
                ? openSeries
                    .map((linedata) => linedata.data)
                    .reduce((rec, d) => rec.concat(d), [])
                : [{ date: NaN, value: NaN }]
            )
            .concat(
              eventSeries
                ? eventSeries
                    .map((linedata) => linedata.data)
                    .reduce((rec, d) => rec.concat(d), [])
                : [{ date: NaN, value: NaN }]
            ),
          getDateNum
        ) as [Date, Date],
      }),
    [xMax, closedSeries, openSeries, eventSeries]
  );

  // State of the local brush is set with the
  // central bruch positon if not defined
  /// then it is assigned value as per brushDateScale
  const [localBrushPosition, setLocalBrushPosition] =
    useState<StrictBrushPostitionProps>({
      start: {
        x:
          centralBrushPosition?.start.x ??
          new Date(brushDateScale.domain()[0]).getTime(),
      },
      end: {
        x:
          centralBrushPosition?.end.x ??
          new Date(brushDateScale.domain()[1]).getTime(),
      },
    });

  // DateScale is calculated everytime, based on user
  // action
  const dateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: [
          new Date(localBrushPosition.start.x),
          new Date(localBrushPosition.end.x),
        ] as [Date, Date],
      }),
    [xMax, localBrushPosition]
  );

  // Value scale is calculated for the filtered metrics
  // so it is calculated based on user selection
  const valueScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [
          // Get min of open & close metrics
          // event metric is not used here as
          // the y-value of event metric is Start, End, True, False
          // at this point
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
          // Get max of y-values of open and close metrics
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
          ) || 2,
        ],
        nice: true,
      }),
    [yMax, filteredClosedSeries, filteredOpenSeries]
  );

  // This function is called when user has make selection in the
  // graph or slider. It update the centralBrushPosition
  const updateLocalBrushPosition = useCallback(
    (domain: StrictBrushPostitionProps) => {
      setLocalBrushPosition({
        start: {
          x: domain.start.x,
        },
        end: {
          x: domain.end.x,
        },
      });
      if (handleCentralBrushPosition) {
        if (
          !centralBrushPosition ||
          (centralBrushPosition &&
            (centralBrushPosition.start.x !== domain.start.x ||
              centralBrushPosition.end.x !== domain.end.x))
        )
          handleCentralBrushPosition({
            start: {
              x: domain.start.x,
            },
            end: {
              x: domain.end.x,
            },
          });
      }
    },
    [centralBrushPosition, handleCentralBrushPosition]
  );

  // Whenever new selection is make all the filterd metrics
  // are updated with the data as per new selection (new time domain)
  const filterAllDateWithNewDomain = useCallback(
    (domain: StrictBrushPostitionProps) => {
      // start date of the selection
      const x0 = domain.start.x;

      // end date of the selection
      const x1 = domain.end.x;

      if (closedSeries) {
        const seriesCopy = closedSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x >= x0 && x <= x1;
            })
          )
          .map((linedata, i) => ({
            metricName: closedSeries[i].metricName,
            data: linedata,
            baseColor: closedSeries[i].baseColor,
          }));

        setFilteredClosedSeries(seriesCopy);
      }

      if (openSeries) {
        const seriesCopy = openSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x >= x0 && x <= x1;
            })
          )
          .map((linedata, i) => ({
            metricName: openSeries[i].metricName,
            data: linedata,
            baseColor: openSeries[i].baseColor,
          }));

        setFilteredOpenSeries(seriesCopy);
      }
      if (eventSeries) {
        const seriesCopy = eventSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x >= x0 && x <= x1;
            })
          )
          .map((linedata, i) => ({
            metricName: eventSeries[i].metricName,
            data: linedata,
            subData: eventSeries[i].subData,
            baseColor: eventSeries[i].baseColor,
          }));

        setFilteredEventSeries(seriesCopy);
      }
    },
    [closedSeries, openSeries, eventSeries]
  );

  // When the brush position of this graph is changed (not the central Brush)
  // then the data is filtered as per new domain
  const handleLocalBrushPositionUpdate = useCallback(() => {
    setAutoRender(false);
    hideTooltip();
    hideTooltipDate();
    const x0 = localBrushPosition?.start.x;
    const x1 = localBrushPosition?.end.x;

    if (x0 !== undefined && x1 !== undefined) {
      filterAllDateWithNewDomain({
        start: { x: x0 },
        end: { x: x1 },
      });
    }
  }, [
    filterAllDateWithNewDomain,
    hideTooltipDate,
    hideTooltip,
    localBrushPosition,
  ]);

  // useEffect to check if the centralBrushPosition is different from
  // local bursh postion. If so, then the local Brush position is updated

  useEffect(() => {
    if (centralBrushPosition) {
      if (
        typeof centralBrushPosition.start.x === "number" &&
        typeof centralBrushPosition.end.x === "number"
      ) {
        if (
          centralBrushPosition.start.x !== localBrushPosition.start.x ||
          centralBrushPosition.end.x !== localBrushPosition.end.x
        ) {
          setLocalBrushPosition({
            start: { x: centralBrushPosition.start.x },
            end: { x: centralBrushPosition.end.x },
          });
        }
      }
    }
  }, [centralBrushPosition, localBrushPosition]);

  // Any change in the localBurshPosition, trigger filtering of the daata
  useEffect(() => {
    if (localBrushPosition) handleLocalBrushPositionUpdate();
  }, [localBrushPosition, handleLocalBrushPositionUpdate]);

  // If the data of the metrics is updated real-time then
  /// the local BrushPosition is reset only if allowGraphUpdate is true
  useEffect(() => {
    if (allowGraphUpdate) {
      setLocalBrushPosition({
        start: {
          x: new Date(brushDateScale.domain()[0]).getTime(),
        },
        end: {
          x: new Date(brushDateScale.domain()[1]).getTime(),
        },
      });
    }
  }, [allowGraphUpdate, brushDateScale, openSeries, closedSeries, eventSeries]);

  // The local graph updated is controlled by the centralAllowGraphUpdate
  // This is usefull for the case when the user has zoomed in
  useEffect(() => {
    if (typeof centralAllowGraphUpdate === "boolean") {
      setAllowGraphUpdate(centralAllowGraphUpdate);
    }
  }, [centralAllowGraphUpdate]);

  // Handle the change in the slider values
  const handleChangeSlider = (event: any, newValue: number | number[]) => {
    setAutoRender(false);

    let x0 = 0;
    let x1 = 0;

    if (newValue && typeof newValue !== "number") {
      x0 = newValue[0];
      x1 = newValue[1];
    }
    if (
      (newValue && localBrushPosition.start.x !== x0) ||
      localBrushPosition.end.x !== x1
    ) {
      updateLocalBrushPosition({
        start: { x: x0 },
        end: { x: x1 },
      });
    }

    hideTooltip();
    hideTooltipDate();
    filterAllDateWithNewDomain({
      start: { x: x0 },
      end: { x: x1 },
    });
  };

  // end handle Slider

  // tooltip handler
  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      // Initialize variable to store all the individual points
      // of all the metrics based on current mouse pointer location
      // Note: this is any array of data
      // because for one point on x-axis there can be multiple
      // points on y-axis (each metric might have one point)
      let pointerDataSelection: ToolTipDateValue[] = [
        { metricName: "", data: { date: NaN, value: NaN }, baseColor: "" },
      ];
      // All the computation related to tooltip is only performed
      // if it is enabled
      // this save a lot of memory when it is disabled
      if (showTips) {
        // get the local Points (mouse location )
        let { x, y } = localPoint(event) || { x: 0, y: 0 };
        // Subtract the margins
        x -= margin.left;
        y -= margin.top;

        // Convert the local point from pixel to the actual
        // form of data as passed by the user
        // For eg. x is 200 px this might correspond to
        // 5:00 am, 1st Aug, 2021
        const x0 = dateScale.invert(x);
        // Multi tooltip means that when hovering over
        // a point above x-axis, it will show the points
        // of all the metric in the tooltip
        // if it is false then it will show the point only
        // for the metric point which is closest to the mouse
        // pointer both in x,y coordinate
        if (showMultiToolTip) {
          setMouseY(y);
        }

        if (firstMouseEnterGraph === false) {
          // First Mouse Enter is used because in the legend
          // table data, the Curr field will be empty
          // if mouse has never entered the graph
          setMouseEnterGraph(true);
        }
        i = 0;
        // Check if filterdClosedSeries is defined and not null
        if (filteredClosedSeries) {
          // Iterate over all the metrics that are part of filterdClosedSeries
          for (j = 0; j < filteredClosedSeries.length; j++) {
            // Slice or bisect all the metric data at a point x0 based on
            // mouse pointer location
            indexer = bisectDate(filteredClosedSeries[i].data, x0, 1);
            // dd1 is the point on immediate right to the mouse pointer
            // dd0 is the point on immediate left of dd1
            dd0 = filteredClosedSeries[j]?.data[indexer - 1] ?? undefined;
            dd1 = filteredClosedSeries[j]?.data[indexer] ?? undefined;
            // Two point are taken into consideration
            // as for the time series data, some metric may be defined
            // only till certain time and after that they might become undefined

            // Here we check which of the two are more close to the mouse pointer
            if (dd1) {
              pointerDataSelection[i] =
                x0.valueOf() - getDateNum(dd0).valueOf() >
                getDateNum(dd1).valueOf() - x0.valueOf()
                  ? {
                      metricName: filteredClosedSeries[i].metricName,
                      data: dd1,
                      baseColor: filteredClosedSeries[i].baseColor,
                    }
                  : {
                      metricName: filteredClosedSeries[i].metricName,
                      data: dd0,
                      baseColor: filteredClosedSeries[i].baseColor,
                    };
              i++;
            }
          }
        }
        // Same process for filteredOpenSeries
        // TODO as the steps remain same for both open and close series
        // they can be performed using a single function
        if (filteredOpenSeries) {
          for (j = 0; j < filteredOpenSeries.length; j++) {
            indexer = bisectDate(filteredOpenSeries[j].data, x0, 1);
            dd0 = filteredOpenSeries[j]?.data[indexer - 1] ?? undefined;
            dd1 = filteredOpenSeries[j]?.data[indexer] ?? undefined;

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
        // Now we sort the pointer data as per date
        // this is performed because there might be a case
        // where there is a discontinuity in the time series metric
        // which can result in selection of points of all the metric
        // that have a different date stamp
        // so for any tooltip is should show the tip at only one point
        // not multiple
        pointerDataSelection = pointerDataSelection.sort((a, b) =>
          a.data.date > b.data.date ? 1 : -1
        );
        const firstToolTipData = pointerDataSelection[0];
        // after selecting a single point all the pointer data is
        // filterd accordingly
        pointerDataSelection = pointerDataSelection.filter(
          (elem) =>
            elem.data &&
            firstToolTipData.data &&
            elem.data.date <= firstToolTipData.data.date
        );
        // same is to be used in the legendTable so here it is stored
        // in a variable
        legenTablePointerData = JSON.parse(
          JSON.stringify(pointerDataSelection)
        );

        // here it is sorted as per value
        // this step is performed so that
        // for the case when the showMultiToolTip is off
        // we will be able to bisect the metric based on y coordinate
        pointerDataSelection = pointerDataSelection.sort((a, b) =>
          a.data.value > b.data.value ? 1 : -1
        );

        if (!showMultiToolTip) {
          let index0 = 0;
          let closestValue: number | undefined;
          if (pointerDataSelection && pointerDataSelection[0]) {
            // Get the actual y value from the mouse pointer
            const y0: number = valueScale.invert(y);
            // the bisection is performed here
            index0 = bisectorValue(pointerDataSelection, y0, 1);
            // similar to previous computation
            // the closest among dd0 and dd1 to the pointer is selected
            dd0 = pointerDataSelection[index0]?.data ?? undefined;
            dd1 = pointerDataSelection[index0 - 1]?.data ?? undefined;
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
            // Once we have the closest value
            // all the pointer data is again filterd
            // to that the tooltip has only one y point
            // also if there are multiple points on the same (x, y)
            // then they will be taken as array
            if (typeof closestValue === "number") {
              pointerDataSelection = pointerDataSelection.filter(
                (lineData) => lineData.data.value === closestValue
              );
            }
          }
        }
        // storing the length of the pointerData or the length of all data
        // to be shown in the tooltip (open series + closed series)
        toolTipPointLength = pointerDataSelection.length;
        let singleEventToolTip: ToolTipDateValue;
        // clearning the eventTable data
        eventTableData = eventTableData.splice(0);
        let k = 0;
        // trimPreviewToolTipData acts as a boolean check
        // so that data is not trimmed twice
        let trimPreviousToopTipData = 0;
        // if filteredEventSeries is defiend
        if (filteredEventSeries) {
          // Iterate over all the metrics passed as part of event series
          for (j = 0; j < filteredEventSeries.length; j++) {
            // same bisecting as above
            indexer = bisectDate(filteredEventSeries[j].data, x0, 1);
            dd0 = filteredEventSeries[j]?.data[indexer - 1] ?? undefined;
            dd1 = filteredEventSeries[j]?.data[indexer] ?? undefined;

            // 1. for the case when tooltip data till this point is greater than 0
            // means that there is at least one point in open series and
            // closed series which was added in the tooltip
            // 2. making sure that trim opertion is being performed only for the first time
            // 3. For the dd1(defined) of the event metric, checking its distance from mouse pointer is
            // less than the distance between the last point of the
            // pointerDataSelection or not

            if (
              dd1 &&
              toolTipPointLength > 0 &&
              trimPreviousToopTipData === 0 &&
              Math.abs(x0.valueOf() - getDateNum(dd1).valueOf()) <
                Math.abs(
                  getDateNum(
                    pointerDataSelection[toolTipPointLength - 1].data
                  ).valueOf() - x0.valueOf()
                )
            ) {
              // for case when dd1 is defined and event metric point
              // is closer to mouse pointer than the pointerDataSelection
              // then the pointerDataSelection is truncated
              i = 0;
              toolTipPointLength = 0;
              trimPreviousToopTipData = 1;
              pointerDataSelection.slice(0, 0);
            } else if (
              dd0 &&
              toolTipPointLength > 0 &&
              trimPreviousToopTipData === 0 &&
              Math.abs(x0.valueOf() - getDateNum(dd0).valueOf()) <
                Math.abs(
                  getDateNum(
                    pointerDataSelection[toolTipPointLength - 1].data
                  ).valueOf() - x0.valueOf()
                )
            ) {
              //  if dd1 was undefined,
              // then we perform the same check for dd0
              i = 0;
              toolTipPointLength = 0;
              trimPreviousToopTipData = 1;
              pointerDataSelection.slice(0, 0);
            }

            // if dd1 is defined, then
            //    1. if all the data in the tooltip has been truncated
            //      then the distance of dd1 from mouse is less then dd0
            //    or
            //   2. if tooltip contains some data points
            //      then the date of all the points in the tooltip
            //      should be same as the event metric points
            //      that has to be added in the tooltip data

            if (
              dd1 &&
              ((toolTipPointLength === 0 &&
                x0.valueOf() - getDateNum(dd0).valueOf() >
                  getDateNum(dd1).valueOf() - x0.valueOf()) ||
                (toolTipPointLength > 0 &&
                  dd1.date ===
                    pointerDataSelection[toolTipPointLength - 1].data.date))
            ) {
              singleEventToolTip = {
                metricName: filteredEventSeries[j].metricName,
                data: dd1,
                baseColor: filteredEventSeries[j].baseColor,
              };
              legenTablePointerData[j + legenTablePointerData.length] =
                singleEventToolTip;

              if (dd1.value !== "False") {
                pointerDataSelection[i++] = singleEventToolTip;
                // Selection of the sub-data for the
                // subData Table from the filteredEventSeries
                // on which the user is hovering
                eventTableData[k] = {
                  data: [filteredEventSeries[j].metricName],
                  baseColor: filteredEventSeries[j].baseColor,
                };
                k++;
                // For a singleEvent where the user is hovering,
                // here we are trying to get to the start and end point
                // of that event
                let startSingleEvent = indexer;
                let endSingleEvent = indexer;

                while (
                  startSingleEvent > 0 &&
                  (filteredEventSeries[j].data[startSingleEvent].value ===
                    "True" ||
                    filteredEventSeries[j].data[startSingleEvent].value ===
                      "End")
                ) {
                  startSingleEvent--;
                }
                while (
                  endSingleEvent < filteredEventSeries[j].data.length - 1 &&
                  (filteredEventSeries[j].data[endSingleEvent].value ===
                    "True" ||
                    filteredEventSeries[j].data[endSingleEvent].value ===
                      "Start")
                ) {
                  endSingleEvent++;
                }

                if (filteredEventSeries[j].subData) {
                  filteredEventSeries[j].subData?.forEach((singleSubData) => {
                    // Checking if the timeStamp of the subData lands
                    // within the start and end of singleEvent the user is hovering
                    if (
                      singleSubData &&
                      singleSubData.date >=
                        filteredEventSeries[j].data[startSingleEvent].date &&
                      singleSubData.date <=
                        filteredEventSeries[j].data[endSingleEvent].date
                    ) {
                      eventTableData[k++] = {
                        data: [singleSubData.subDataName, singleSubData.value],
                      };
                    }
                  });
                }
              }
            } else if (
              dd0 &&
              ((toolTipPointLength === 0 &&
                x0.valueOf() - getDateNum(dd0).valueOf() <
                  getDateNum(dd1).valueOf() - x0.valueOf()) ||
                (toolTipPointLength > 0 &&
                  dd0.date ===
                    pointerDataSelection[toolTipPointLength - 1].data.date))
            ) {
              // if dd1 was undefined
              // then similar steps are followed for dd0
              singleEventToolTip = {
                metricName: filteredEventSeries[j].metricName,
                data: dd0,
                baseColor: filteredEventSeries[j].baseColor,
              };
              legenTablePointerData[j + legenTablePointerData.length] =
                singleEventToolTip;

              if (dd0.value !== "False") {
                pointerDataSelection[i++] = singleEventToolTip;
                eventTableData[k] = {
                  data: [filteredEventSeries[j].metricName],
                  baseColor: filteredEventSeries[j].baseColor,
                };
                k++;
                let startSingleEvent = indexer - 1;
                let endSingleEvent = indexer - 1;

                while (
                  startSingleEvent > 0 &&
                  (filteredEventSeries[j].data[startSingleEvent].value ===
                    "True" ||
                    filteredEventSeries[j].data[startSingleEvent].value ===
                      "End")
                ) {
                  startSingleEvent--;
                }
                while (
                  endSingleEvent < filteredEventSeries[j].data.length - 1 &&
                  (filteredEventSeries[j].data[endSingleEvent].value ===
                    "True" ||
                    filteredEventSeries[j].data[endSingleEvent].value ===
                      "Start")
                ) {
                  endSingleEvent++;
                }

                if (filteredEventSeries[j].subData) {
                  filteredEventSeries[j].subData?.forEach((singleSubData) => {
                    if (
                      singleSubData &&
                      singleSubData.date >=
                        filteredEventSeries[j].data[startSingleEvent].date &&
                      singleSubData.date <=
                        filteredEventSeries[j].data[endSingleEvent].date
                    ) {
                      eventTableData[k++] = {
                        data: [singleSubData.subDataName, singleSubData.value],
                      };
                    }
                  });
                }
              }
            }
          }
        }
        // Here, the event metric data is also added to the pointerDataSelection
        // so if the date stamp of event metric was closer to the combined(open + closed)
        // series data, then the combined series data would have been truncated
        // and only event series data is added to the poninter data
        pointerDataSelection = pointerDataSelection.slice(0, i);

        i = 0;
        // Slicing just for clearning any old data
        eventTableData = eventTableData.slice(0, k);
        // Passing hyphen if eventTableData data is empty
        if (eventTableData.length === 0) {
          eventTableData[0] = { data: ["--", "--"] };
        }
      }
      // render graph only if width is greater than certain limit
      if (width < 10) return null;
      // The tooltip must be displayed near the mouse pointer
      // to the left and top is derived from the pointerDataSelection
      const tooltipLeftValue =
        pointerDataSelection[0] && pointerDataSelection[0].data
          ? dateScale(getDateNum(pointerDataSelection[0].data))
          : dateScale(xMax);
      // The date is converted to the dateScale that is in px
      // also a fall back option dateScale(xMax) is also given

      // Top for the toolip is calcuted as per valueScale
      const tooltipTopValue =
        pointerDataSelection[0] && pointerDataSelection[0].data
          ? valueScale(getValueNum(pointerDataSelection[0].data))
          : 0;
      // here, there are two separate tooltips
      // reason is that the date stamp is shown separately
      // and the rest of the data (metric name and value)
      // is shown separately
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
      dateScale,
      xMax,
      valueScale,
      showTooltip,
      showTooltipDate,
      margin.left,
      margin.top,
      showMultiToolTip,
      firstMouseEnterGraph,
      filteredClosedSeries,
      filteredOpenSeries,
      filteredEventSeries,
    ]
  );
  // function is fired when selection is performed
  // using brush
  const onBrushChange = useCallback(
    (domain: Bounds | null) => {
      if (!domain) return;

      // First freeze graph updation
      setAllowGraphUpdate(false);

      // Also freeze all other connected graphs
      handleCentralAllowGraphUpdate?.(false);

      // Disable rendering
      setAutoRender(false);
      const { x0, x1 } = domain;

      // Remove the old tooltip from the screen
      hideTooltip();
      hideTooltipDate();

      // Update the LocalBrushPosition with new domain
      updateLocalBrushPosition({
        start: { x: x0 },
        end: { x: x1 },
      });

      // Filter data with new domains
      filterAllDateWithNewDomain({
        start: { x: x0 },
        end: { x: x1 },
      });
    },
    [
      handleCentralAllowGraphUpdate,
      hideTooltip,
      hideTooltipDate,
      updateLocalBrushPosition,
      filterAllDateWithNewDomain,
    ]
  );

  // Display legend table if showLegendTable is true
  if (showLegendTable) {
    legenddata = legenddata.splice(0);

    // As per user selection if filteredEventSeries is defined
    if (filteredEventSeries) {
      filteredEventSeries.map((linedata, index) => {
        // Filter the event metric from the legenTablePointeData
        // this step also avoids multiple entries with same name
        const pointerElement = legenTablePointerData
          ? legenTablePointerData.filter(
              (singleMetric) => singleMetric.metricName === linedata.metricName
            )[0]
          : undefined;

        // Curr (current or recent mouse pointer location)is only defined
        // when the user has entered in the graph for at leat once
        const curr = pointerElement
          ? getValueStr(pointerElement.data)
          : firstMouseEnterGraph
          ? "--"
          : getValueStr(linedata.data[linedata.data.length - 1]);

        // avg (average) is initialized with --
        // for event series avg won't be defined
        // as by now the data in the event metric is (True, False, Start, End)
        const avg = "--";
        //  all the constructed values are assigned to legenddata
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
        // Same steps as event metric
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
        // avg is caculated over all the points present the filtered metric
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
    //  same steps as above
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
  // The start and end calculated over all data is stored
  // to be used by the range slider placed at the bottom of the graph
  const marks = [
    {
      value: new Date(brushDateScale.domain()[0]).getTime(),
      label: valueLabelFormat(new Date(brushDateScale.domain()[0]).getTime()),
    },
    {
      value: new Date(brushDateScale.domain()[1]).getTime(),
      label: valueLabelFormat(new Date(brushDateScale.domain()[1]).getTime()),
    },
  ];

  // Reset the graph is data Render is true
  // TODO as per new addition of multiple zooming this if statement
  // may be omitted
  if (
    (filteredClosedSeries !== closedSeries ||
      filteredOpenSeries !== openSeries ||
      filteredEventSeries !== eventSeries) &&
    dataRender
  ) {
    setFilteredClosedSeries(closedSeries);
    setFilteredOpenSeries(openSeries);
    setFilteredEventSeries(eventSeries);
  }

  return (
    <div
      onMouseLeave={() => hideTooltipDate()}
      style={{
        width,
        height,
        position: "relative",
      }}
    >
      {/* Constuct an svg */}
      <svg width={width} height={svgElementHeight}>
        {/* Plot a background rect */}
        <rect
          x={0}
          y={0}
          width={width}
          height={svgElementHeight}
          className={classes.rectBase}
        />
        {/* Group all plotting components and position them */}
        <Group
          top={0}
          width={width}
          height={yMax}
          onMouseLeave={() => hideTooltip()}
        >
          {/*Plot the graph*/}
          <PlotLineAreaGraph
            showPoints={showPoints}
            hideBottomAxis={compact}
            closedSeries={filteredClosedSeries ?? []}
            openSeries={filteredOpenSeries ?? []}
            eventSeries={filteredEventSeries ?? []}
            width={width}
            height={yMax}
            margin={{ ...margin }}
            yMax={yMax}
            xMax={xMax}
            xScale={dateScale}
            yScale={valueScale}
            {...rest}
          >
            {/* Formulate a linear gradient for the zooming brush */}
            <LinearGradient
              id="linearGradient-Brush"
              from={palette.text.primary}
              to={palette.text.primary}
              fromOpacity={0.4}
              toOpacity={0}
            />
            {/* Add the zoom brush */}
            <Brush
              xScale={dateScale}
              yScale={valueScale}
              width={xMax}
              height={yMax}
              margin={margin}
              handleSize={8}
              resizeTriggerAreas={["left", "right"]}
              resetOnEnd
              // When the user completes (ends) his selection
              // then fire the onBrushChange func
              onBrushEnd={onBrushChange}
              // For any change in the brush first hide the old tooltip
              onChange={() => hideTooltip()}
              selectedBoxStyle={{
                fill: "url(#linearGradient-Brush)",
                stroke: palette.text.primary,
                strokeOpacity: "0.8",
              }}
              // Handle mouse pointer move to generate a new tooltip
              onMouseMove={handleTooltip}
              // When the user click on the graph then the zoom out or reset has
              // to occur
              // 1. Allow all the graph to update themselves to the lasted data
              // this is done for the case when data is updating real-time
              // 2. Allow all connected graph to update
              // 3. Rest all filtered metric with complete data
              // 4. Prevent render
              // 5. Set/ Rest new brush location locally
              // 6. Update the new central brush location
              // 7. Allow render
              // 8. hide all old tooltips
              onClick={() => {
                setAllowGraphUpdate(true);
                handleCentralAllowGraphUpdate?.(true);
                setFilteredClosedSeries(closedSeries);
                setFilteredOpenSeries(openSeries);
                setFilteredEventSeries(eventSeries);
                setAutoRender(false);
                setLocalBrushPosition({
                  start: {
                    x: new Date(brushDateScale.domain()[0]).getTime(),
                  },
                  end: { x: new Date(brushDateScale.domain()[1]).getTime() },
                });
                handleCentralBrushPosition?.({
                  start: {
                    x: new Date(brushDateScale.domain()[0]).getTime(),
                  },
                  end: { x: new Date(brushDateScale.domain()[1]).getTime() },
                });
                setAutoRender(true);
                hideTooltip();
                hideTooltipDate();
              }}
            />
            {/*  if showTips is true and tooltip data is defined */}
            {showTips && tooltipDataDate && tooltipDataDate[0] && (
              // draw a line
              <Line
                key={`${tooltipDataDate[0].metricName}-toolTipLine`}
                from={{
                  x: dateScale(getDateNum(tooltipDataDate[0].data)),
                  y: valueScale.range()[1],
                }}
                to={{
                  x: dateScale(getDateNum(tooltipDataDate[0].data)),
                  y: valueScale.range()[0],
                }}
                className={classes.tooltipLine}
              />
            )}
            {/* plot a circle at the point as per tooltip */}
            {showTips &&
              !showMultiToolTip &&
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
        </Group>
      </svg>
      {/* Add the range slider */}
      {showRangeSlider && (
        <div className={classes.rangeSliderParent}>
          <SliderMui
            ValueLabelComponent={valueLabelComponent}
            value={[localBrushPosition.start.x, localBrushPosition.end.x]}
            min={new Date(brushDateScale.domain()[0]).getTime()}
            max={new Date(brushDateScale.domain()[1]).getTime()}
            marks={marks}
            getAriaValueText={valueLabelFormat}
            valueLabelDisplay="auto"
            onChange={handleChangeSlider}
          />
        </div>
      )}
      {/* Print the date tooltip */}
      {tooltipDataDate && showTips && tooltipDataDate[0] && (
        <Tooltip
          // key added as per visx guideline
          key={Math.random()}
          top={yMax}
          left={tooltipLeftDate}
          className={classes.tooltipDateStyles}
        >
          {/* Print date stamp as per specified format */}
          <div className={`${classes.tooltipBottomDate}`}>
            <span>{` ${dayjs(
              new Date(getDateNum(tooltipDataDate[0].data))
            ).format(toolTiptimeFormat)}`}</span>
          </div>
        </Tooltip>
      )}
      {/* Print the metric name and value  */}
      {tooltipData && showTips && tooltipData[0] && (
        // Tooltip with bounds
        <TooltipWithBounds
          // key added as per visx guideline
          key={Math.random()}
          left={tooltipLeft + margin.left}
          top={showMultiToolTip ? mouseY : tooltipTop}
          // Hardcoded value for tooltip
          // will be removed later
          className={`${classes.tooltipMetric}
          }`}
        >
          {tooltipData.map((linedata, index) => (
            <div key={`tooltipName-value- ${linedata.metricName}-${index}`}>
              <div className={classes.tooltipData}>
                <div className={classes.tooltipLabel}>
                  {/* Add legend marker with metric color */}
                  <div
                    className={classes.legendMarker}
                    style={{ background: linedata.baseColor }}
                  />
                  {/* Add name of the metric */}
                  <span>{`${linedata.metricName}`}</span>
                </div>
                {/* Add metric value */}
                <div className={classes.tooltipValue}>
                  <span>{`${getValueStr(linedata.data)}`}</span>
                </div>
              </div>
            </div>
          ))}
        </TooltipWithBounds>
      )}
      {/* Displaying legend and event data Table */}
      {showLegendTable && showEventTable && (
        <div className={classes.wrapperParentLegendAndEventTable}>
          <div className={classes.wrapperLegendTable}>
            {/* Pass legend data to LegendTable component */}
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
      {/* displaying only legend table */}
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
