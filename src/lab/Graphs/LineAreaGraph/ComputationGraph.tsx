import { useTheme } from "@material-ui/core";
import BaseBrush, {
  BaseBrushState,
  UpdateBrush,
} from "@visx/brush/lib/BaseBrush";
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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LegendData } from "../LegendTable";
import { LegendTable } from "../LegendTable/LegendTable";
import {
  DateValue,
  LineAreaGraphChildProps,
  TooltipData,
  ToolTipDateValue,
} from "./base";
import { PlotLineAreaGraph } from "./PlotLineAreaGraph";
import { useStyles } from "./styles";
import {
  bisectDate,
  bisectorValue,
  getDateNum,
  getSum,
  getValueNum,
  getValueStr,
} from "./utils";

let dd1: DateValue;
let dd0: DateValue;
let i: number;
let j: number;
let indexer: number;
let toolTipPointLength: number;
let brushBoundData: { x0: number; x1: number; y0: number; y1: number } = {
  x0: 0,
  x1: 0,
  y1: 0,
  y0: 0,
};
const chartSeparation = 10;
let legenTablePointerData: Array<ToolTipDateValue>;
let eventTableData: Array<LegendData> = [{ data: ["--", "--"], baseColor: "" }];

const ComputationGraph: React.FC<LineAreaGraphChildProps> = ({
  compact = false,
  closedSeries,
  openSeries,
  eventSeries,
  showMultiToolTip,
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
  centralBrushPosition,
  handleCentralBrushPosition,
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
  // Use for showing the tooltip when showMultiTooltip is disabled
  const [mouseY, setMouseY] = useState(0);

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
  const brushRef = useRef<BaseBrush | null>(null);

  const onBrushChange = useCallback(
    (domain: Bounds | null) => {
      if (!domain) return;
      setAutoRender(false);
      const { x0, x1, y0, y1 } = domain;
      brushBoundData = { x0, x1, y0, y1 };
      hideTooltip();
      hideTooltipDate();
      if (
        handleCentralBrushPosition &&
        (!centralBrushPosition || centralBrushPosition.start.x !== x0)
      ) {
        handleCentralBrushPosition({
          start: { x: x0 },
          end: { x: x1 },
        });
        console.log("x0:x1", x0, x1);
        console.log(
          "centralBrush Position",
          brushDateScale(centralBrushPosition?.start.x ?? 0)
        );
        console.log(
          "upddated brush postion",
          updatedBrushPosition.start.x,
          updatedBrushPosition.end.x
        );
        console.log("brushRef", brushRef.current);
        console.log(
          "date scasle 0:1",
          new Date(dateScale.domain()[0]).getTime(),
          new Date(dateScale.domain()[1]).getTime()
        );
        // console.log("initial brush postion", initialBrushPosition);

        // console.log("current", brushRef.current);
      }
      if (closedSeries) {
        const seriesCopy = closedSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x > x0 && x < x1;
            })
          )
          .map((linedata, i) => ({
            metricName: closedSeries[i].metricName,
            data: linedata,
            baseColor: closedSeries[i].baseColor,
          }));

        setFilteredSeries(seriesCopy);
      }

      if (openSeries) {
        const seriesCopy = openSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x > x0 && x < x1;
            })
          )
          .map((linedata, i) => ({
            metricName: openSeries[i].metricName,
            data: linedata,
            baseColor: openSeries[i].baseColor,
          }));

        setfilteredOpenSeries(seriesCopy);
      }
      if (eventSeries) {
        const seriesCopy = eventSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDateNum(s).getTime();
              return x > x0 && x < x1;
            })
          )
          .map((linedata, i) => ({
            metricName: eventSeries[i].metricName,
            data: linedata,
            subData: eventSeries[i].subData,
            baseColor: eventSeries[i].baseColor,
          }));

        setfilteredEventSeries(seriesCopy);
      }
    },
    [
      filteredClosedSeries,
      filteredOpenSeries,
      filteredEventSeries,
      hideTooltip,
      hideTooltipDate,
    ]
  );

  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = compact
    ? chartSeparation / 2
    : chartSeparation + 10;
  const topChartHeight = innerHeight - topChartBottomMargin;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);

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

  const brushValueScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax / 2, 0],
        domain: [
          min(
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
              .concat([{ date: new Date().getTime(), value: 0 }]),
            getValueNum
          ) || 0,
          max(
            (closedSeries
              ? closedSeries
                  .map((linedata) => linedata.data)
                  .reduce((rec, d) => rec.concat(d), [])
              : [{ date: NaN, value: NaN }]
            ).concat(
              openSeries
                ? openSeries
                    .map((linedata) => linedata.data)
                    .reduce((rec, d) => rec.concat(d), [])
                : [{ date: NaN, value: NaN }]
            ),
            getValueNum
          ) || 1,
        ],
        nice: true,
      }),
    [yMax, closedSeries, openSeries]
  );

  // handlers for brush
  const initialBrushPosition = useMemo(
    () => ({
      // start: { x: brushDateScale.range()[1] },
      // end: { x: brushDateScale.range()[0] },
      start: { x: 0 },
      end: { x: 50 },
    }),
    [brushDateScale, centralBrushPosition]
  );

  const updatedBrushPosition = useMemo(
    () => ({
      // start: { x: brushDateScale.range()[1] },
      // end: { x: brushDateScale.range()[0] },
      start: {
        x: brushDateScale(
          centralBrushPosition
            ? new Date(
                typeof centralBrushPosition.start.x === "number"
                  ? centralBrushPosition.start.x
                  : 0
              )
            : new Date(0)
        ),
      },
      end: {
        x: brushDateScale(
          centralBrushPosition
            ? new Date(
                typeof centralBrushPosition.end.x === "number"
                  ? centralBrushPosition.end.x
                  : 0
              )
            : new Date(0)
        ),
      },
    }),
    [brushDateScale, centralBrushPosition]
  );
  // event handlers
  const handleClearClick = () => {
    if (brushRef?.current) {
      // setFilteredStock(stock);
      setFilteredSeries(closedSeries);
      setfilteredOpenSeries(openSeries);
      setfilteredEventSeries(eventSeries);
      brushRef.current.reset();
    }
  };

  const handleResetClick = () => {
    if (brushRef?.current) {
      setFilteredSeries(closedSeries);
      setfilteredOpenSeries(openSeries);
      setfilteredEventSeries(eventSeries);
      const updater: UpdateBrush = (prevBrush) => {
        const newExtent = brushRef.current!.getExtent(
          initialBrushPosition.start,
          initialBrushPosition.end
        );

        const newState: BaseBrushState = {
          ...prevBrush,
          // start: { y: newExtent.y0, x: newExtent.x0 },
          // end: { y: newExtent.y1, x: newExtent.x1 },

          start: { y: newExtent.y0, x: newExtent.x0 },

          end: { y: newExtent.y1, x: newExtent.y1 },
          extent: newExtent,
        };

        return newState;
      };
      brushRef.current.updateBrush(updater);
    }
  };
  const handleBrushUpdate = () => {
    if (brushRef?.current) {
      setFilteredSeries(closedSeries);
      setfilteredOpenSeries(openSeries);
      setfilteredEventSeries(eventSeries);
      const updater: UpdateBrush = (prevBrush) => {
        const newExtent = brushRef.current!.getExtent(
          updatedBrushPosition.start,
          updatedBrushPosition.end
        );

        const newState: BaseBrushState = {
          ...prevBrush,
          // start: { y: newExtent.y0, x: newExtent.x0 },
          // end: { y: newExtent.y1, x: newExtent.x1 },

          start: { y: newExtent.y0, x: newExtent.x0 },

          end: { y: newExtent.y1, x: newExtent.y1 },
          extent: newExtent,
        };

        return newState;
      };
      brushRef.current.updateBrush(updater);
    }
  };

  // console.log("range", brushDateScale.range());
  // console.log("domain", brushDateScale.domain());
  // console.log("time 0", new Date(brushDateScale.domain()[1]).getTime());
  // scales for graph
  const dateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: [
          new Date(
            brushBoundData.x0 ? brushBoundData.x0 : brushDateScale.domain()[0]
          ),
          new Date(brushBoundData.x1 ?? brushDateScale.domain()[1]),
        ] as [Date, Date],
      }),
    [xMax, filteredClosedSeries, filteredOpenSeries, filteredEventSeries]
  );
  useEffect(() => {
    if (
      centralBrushPosition &&
      brushDateScale(centralBrushPosition?.start.x ?? 0) !==
        new Date(dateScale.domain()[0]).getTime()
    ) {
      handleBrushUpdate();
    }
  }, [centralBrushPosition]);
  // const dateScale = useMemo(
  //   () =>
  //     scaleTime<number>({
  //       range: [0, xMax],
  //       domain: extent(
  //         (filteredClosedSeries
  //           ? filteredClosedSeries
  //               .map((linedata) => linedata.data)
  //               .reduce((rec, d) => rec.concat(d), [])
  //           : [{ date: NaN, value: NaN }]
  //         )
  //           .concat(
  //             filteredOpenSeries
  //               ? filteredOpenSeries
  //                   .map((linedata) => linedata.data)
  //                   .reduce((rec, d) => rec.concat(d), [])
  //               : [{ date: NaN, value: NaN }]
  //           )
  //           .concat(
  //             filteredEventSeries
  //               ? filteredEventSeries
  //                   .map((linedata) => linedata.data)
  //                   .reduce((rec, d) => rec.concat(d), [])
  //               : [{ date: NaN, value: NaN }]
  //           ),
  //         getDateNum
  //       ) as [Date, Date],
  //     }),
  //   [xMax, filteredClosedSeries, filteredOpenSeries, filteredEventSeries]
  // );

  const valueScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax / 2, 0],
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
          ) || 1,
        ],
        nice: true,
      }),
    [yMax, filteredClosedSeries, filteredOpenSeries]
  );

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
        const y0 = valueScale.invert(y);
        if (firstMouseEnterGraph === false) {
          setMouseEnterGraph(true);
        }
        i = 0;
        if (filteredClosedSeries) {
          for (j = 0; j < filteredClosedSeries.length; j++) {
            indexer = bisectDate(filteredClosedSeries[i].data, x0, 1);
            dd0 = filteredClosedSeries[j].data[indexer - 1];
            dd1 = filteredClosedSeries[j].data[indexer];

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
            dd0 = filteredOpenSeries[j].data[indexer - 1];
            dd1 = filteredOpenSeries[j].data[indexer];

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

          index0 = bisectorValue(pointerDataSelection, y0);
          dd0 = pointerDataSelection[index0].data;
          dd1 = pointerDataSelection[index0 - 1].data;
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
        toolTipPointLength = pointerDataSelection.length;
        let singleEventToolTip: ToolTipDateValue;
        eventTableData = eventTableData.splice(0);
        let k = 0;
        let trimPreviousToopTipData = 0;

        if (filteredEventSeries) {
          for (j = 0; j < filteredEventSeries.length; j++) {
            indexer = bisectDate(filteredEventSeries[j].data, x0, 1);
            dd0 = filteredEventSeries[j].data[indexer - 1];
            dd1 = filteredEventSeries[j].data[indexer];
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
  return (
    <div
      onMouseLeave={() => hideTooltipDate()}
      style={{
        width,
        height: height + legendTableHeight,
        position: "relative",
      }}
    >
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          className={classes.rectBase}
        />
        <Group
          top={0}
          width={width}
          height={yMax / 2}
          onMouseLeave={() => hideTooltip()}
        >
          <PlotLineAreaGraph
            showPoints={showPoints}
            hideBottomAxis={compact}
            closedSeries={filteredClosedSeries}
            openSeries={filteredOpenSeries}
            eventSeries={filteredEventSeries}
            width={width - 20}
            height={yMax / 2}
            margin={{ ...margin, bottom: topChartBottomMargin }}
            yMax={yMax / 2}
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
              height={yMax / 2}
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
        {/* Bottom slider */}
        <Group
          top={yMax / 2 + 30}
          left={margin.left}
          width={width - margin.left - margin.right}
          height={yMax / 2}
          onDoubleClick={() => {
            setFilteredSeries(closedSeries);
            setfilteredOpenSeries(openSeries);
            setfilteredEventSeries(eventSeries);
            // handleResetClick();
            handleResetClick();
            setAutoRender(true);
            hideTooltip();
            hideTooltipDate();
          }}
        >
          <rect
            x={0}
            y={0}
            width={width - margin.left - margin.right}
            height={yMax / 2}
            className={classes.rectBase2}
            // style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"
            // style={{ background: "red" }}
            // className={}
          />
          {/* <PlotLineAreaGraph
            showPoints={showPoints}
            hideBottomAxis={compact}
            // closedSeries={closedSeries}
            // openSeries={openSeries}
            // eventSeries={eventSeries}
            width={width - 20}
            height={yMax / 2}
            margin={{ ...margin, bottom: topChartBottomMargin }}
            yMax={yMax / 2}
            xMax={xMax}
            xScale={brushDateScale}
            yScale={brushValueScale}
            {...rest}
          > */}
          <LinearGradient
            id="linearGradient-Brush"
            from={palette.text.primary}
            to={palette.text.primary}
            fromOpacity={0.4}
            toOpacity={0}
          />

          <Brush
            xScale={brushDateScale}
            yScale={brushValueScale}
            width={xMax}
            height={yMax / 2}
            margin={margin}
            handleSize={8}
            resizeTriggerAreas={["left", "right"]}
            // resetOnEnd
            onBrushEnd={onBrushChange}
            // onChange={() => hideTooltip()}
            innerRef={brushRef}
            selectedBoxStyle={{
              fill: "url(#linearGradient-Brush)",
              stroke: palette.text.primary,
              strokeOpacity: "0.8",
            }}
            // onMouseMove={handleTooltip}
            // onClick={() => console.log("j")}
            // onClick={() => {
            //   setFilteredSeries(closedSeries);
            //   setfilteredOpenSeries(openSeries);
            //   setfilteredEventSeries(eventSeries);
            //   // handleResetClick();
            //   handleClearClick();
            //   setAutoRender(true);
            //   hideTooltip();
            //   hideTooltipDate();
            // }}
          />

          {/* </PlotLineAreaGraph> */}
        </Group>
        {/* end plot2 */}
      </svg>
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
