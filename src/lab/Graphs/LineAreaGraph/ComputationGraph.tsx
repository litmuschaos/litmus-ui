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

interface Props {
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
  const svgElementHeight =
    height -
    (showLegendTable ? legendTableHeight : 0) -
    (showRangeSlider ? rangeSliderHeight : 0);

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

  const valueLabelComponent = (props: Props) => {
    const { children, open, value } = props;
    return (
      <TooltipMui
        open={open}
        enterTouchDelay={0}
        placement={"bottom"}
        title={` ${dayjs(new Date(value)).format(toolTiptimeFormat)}`}
      >
        {children}
      </TooltipMui>
    );
  };

  const valueLabelFormat = (value: number) => {
    return ` ${dayjs(new Date(value)).format(toolTiptimeFormat)}`;
  };

  const [filteredClosedSeries, setFilteredClosedSeries] =
    useState(closedSeries);
  const [filteredOpenSeries, setFilteredOpenSeries] = useState(openSeries);
  const [filteredEventSeries, setFilteredEventSeries] = useState(eventSeries);
  const [firstMouseEnterGraph, setMouseEnterGraph] = useState(false);
  const [dataRender, setAutoRender] = useState(true);
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

  // scales for brush

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
          ) || 2,
        ],
        nice: true,
      }),
    [yMax, filteredClosedSeries, filteredOpenSeries]
  );

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

  const filterAllDateWithNewDomain = useCallback(
    (domain: StrictBrushPostitionProps) => {
      const x0 = domain.start.x;
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

  useEffect(() => {
    if (localBrushPosition) handleLocalBrushPositionUpdate();
  }, [localBrushPosition, handleLocalBrushPositionUpdate]);

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

  useEffect(() => {
    if (typeof centralAllowGraphUpdate === "boolean") {
      console.log("updateAllow");
      setAllowGraphUpdate(centralAllowGraphUpdate);
    }
  }, [centralAllowGraphUpdate]);

  console.log("allow:cen", allowGraphUpdate, centralAllowGraphUpdate);
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
      let pointerDataSelection: ToolTipDateValue[] = [
        { metricName: "", data: { date: NaN, value: NaN }, baseColor: "" },
      ];
      if (showTips) {
        let { x, y } = localPoint(event) || { x: 0, y: 0 };
        x -= margin.left;
        y -= margin.top;
        const x0 = dateScale.invert(x);
        if (showMultiToolTip) {
          setMouseY(y);
        }
        const y0: number = valueScale.invert(y);
        if (firstMouseEnterGraph === false) {
          setMouseEnterGraph(true);
        }
        i = 0;
        if (filteredClosedSeries) {
          for (j = 0; j < filteredClosedSeries.length; j++) {
            indexer = bisectDate(filteredClosedSeries[i].data, x0, 1);
            dd0 = filteredClosedSeries[j]?.data[indexer - 1] ?? undefined;
            dd1 = filteredClosedSeries[j]?.data[indexer] ?? undefined;

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

        if (!showMultiToolTip) {
          let index0 = 0;
          let closestValue: number | undefined;
          if (pointerDataSelection && pointerDataSelection[0]) {
            index0 = bisectorValue(pointerDataSelection, y0, 1);
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
            if (typeof closestValue === "number") {
              pointerDataSelection = pointerDataSelection.filter(
                (lineData) => lineData.data.value === closestValue
              );
            }
          }
        }
        toolTipPointLength = pointerDataSelection.length;
        let singleEventToolTip: ToolTipDateValue;
        eventTableData = eventTableData.splice(0);
        let k = 0;
        let trimPreviousToopTipData = 0;

        if (filteredEventSeries) {
          for (j = 0; j < filteredEventSeries.length; j++) {
            indexer = bisectDate(filteredEventSeries[j].data, x0, 1);
            dd0 = filteredEventSeries[j]?.data[indexer - 1] ?? undefined;
            dd1 = filteredEventSeries[j]?.data[indexer] ?? undefined;
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
              i = 0;
              toolTipPointLength = 0;
              trimPreviousToopTipData = 1;
              pointerDataSelection.slice(0, 0);
            }

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
        pointerDataSelection = pointerDataSelection.slice(0, i);

        i = 0;
        eventTableData = eventTableData.slice(0, k);
        // Passing hyphen if eventTableData data is empty
        if (eventTableData.length === 0) {
          eventTableData[0] = { data: ["--", "--"] };
        }
      }
      if (width < 10) return null;
      const tooltipLeftValue =
        pointerDataSelection[0] && pointerDataSelection[0].data
          ? dateScale(getDateNum(pointerDataSelection[0].data))
          : dateScale(xMax);
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
      setAllowGraphUpdate(false);
      handleCentralAllowGraphUpdate?.(false);
      setAutoRender(false);
      const { x0, x1 } = domain;
      hideTooltip();
      hideTooltipDate();
      updateLocalBrushPosition({
        start: { x: x0 },
        end: { x: x1 },
      });

      filterAllDateWithNewDomain({
        start: { x: x0 },
        end: { x: x1 },
      });
    },
    [
      hideTooltip,
      hideTooltipDate,
      filterAllDateWithNewDomain,
      updateLocalBrushPosition,
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
        width: width,
        height: height,
        position: "relative",
      }}
    >
      <svg width={width} height={svgElementHeight}>
        <rect
          x={0}
          y={0}
          width={width}
          height={svgElementHeight}
          className={classes.rectBase}
        />
        <Group
          top={0}
          width={width}
          height={yMax}
          onMouseLeave={() => hideTooltip()}
        >
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
                if (handleCentralBrushPosition) {
                  handleCentralBrushPosition({
                    start: {
                      x: new Date(brushDateScale.domain()[0]).getTime(),
                    },
                    end: { x: new Date(brushDateScale.domain()[1]).getTime() },
                  });
                }
                setAutoRender(true);
                hideTooltip();
                hideTooltipDate();
              }}
            />
            {showTips && tooltipDataDate && tooltipDataDate[0] && (
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
      {tooltipDataDate && showTips && tooltipDataDate[0] && (
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
      )}
      {tooltipData && showTips && tooltipData[0] && (
        <Tooltip
          left={tooltipLeft}
          top={showMultiToolTip ? mouseY : tooltipTop}
          // Hardcoded value for tooltip
          // will be removed later
          className={`${classes.tooltipMetric} ${
            width - margin.left - margin.right - tooltipLeft < 160
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
        </Tooltip>
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
