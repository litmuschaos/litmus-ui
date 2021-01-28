import { useTheme } from '@material-ui/core';
import { Bounds } from '@visx/brush/lib/types';
import {
  Brush,
  Line,
  LinearGradient,
  localPoint,
  scaleLinear,
  scaleTime,
  Tooltip,
  useTooltip,
} from '@visx/visx';
import { bisector, extent, max } from 'd3-array';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { LegendData } from '../LegendTable/base';
import { LegendTable } from '../LegendTable/LegendTable';
import { AreaGraphProps, DataValue, ToolTipInterface } from './base';
import { PlotLineAreaGraph } from './PlotLineAreaGraph';
import { useStyles } from './styles';

type TooltipData = Array<ToolTipInterface>;
let dd1: DataValue;
let dd0: DataValue;
let i: number;
let j: number;
let indexer: number;
let toolTipPointLength: number;

// Accessor functions
const getDateNum = (d: DataValue) =>
  typeof d.date === 'number'
    ? new Date(d.date)
    : new Date(parseInt(d.date, 10));
const getValueNum = (d: DataValue) =>
  typeof d.value === 'number' ? d.value : parseInt(d.value, 10);

const getValueStr = (d: DataValue) =>
  typeof d.value === 'number' ? d.value.toFixed(2).toString() : d.value;

// Bisectors
const bisectDate = bisector<DataValue, Date>((d) => new Date(getDateNum(d)))
  .left;
const bisectorValue = bisector<ToolTipInterface, number>((d) =>
  getValueNum(d.data)
).left;

const chartSeparation = 10;
let legenTablePointerData: Array<ToolTipInterface>;

const ComputationGraph: React.FC<AreaGraphProps> = ({
  compact = false,
  closedSeries,
  openSeries,
  eventSeries,
  showTips = true,
  showPoints = true,
  showLegend = true,
  width = 200,
  height = 200,
  margin = {
    top: 20,
    left: 30,
    bottom: 20,
    right: 10,
  },
  legendTableHeight = 200,
  toolTiptimeFormat = 'MMM D,YYYY h:mm:ss a',
  ...rest
}) => {
  const { palette, graph } = useTheme();

  let legenddata: Array<LegendData> = [{ data: [], baseColor: '' }];
  const classes = useStyles({ width, height });

  const [filteredClosedSeries, setFilteredSeries] = useState(closedSeries);
  const [filteredOpenSeries, setfilteredOpenSeries] = useState(openSeries);
  const [filteredEventSeries, setfilteredEventSeries] = useState(eventSeries);
  const [firstMouseEnterGraph, setMouseEnterGraph] = useState(false);
  const [dataRender, setAutoRender] = useState(true);

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
          0,
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
  const getSum = (total: number, num: number | string) => {
    if (typeof num === 'number') {
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
      let pointerDataSelection: ToolTipInterface[] = [
        { metricName: '', data: dd0, baseColor: '' },
      ];
      if (showTips) {
        let { x, y } = localPoint(event) || { x: 0, y: 0 };
        x = x - margin.left;
        y = y - margin.top;
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
        const dd00: ToolTipInterface = pointerDataSelection[index0];
        const dd11: ToolTipInterface = pointerDataSelection[index0 - 1];
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
        const eventToolTip: Array<ToolTipInterface> = [];
        if (eventSeries) {
          for (j = 0; j < eventSeries.length; j++) {
            indexer = bisectDate(eventSeries[j].data, x0, 1);
            dd0 = eventSeries[j].data[indexer - 1];
            dd1 = eventSeries[j].data[indexer];

            if (
              dd1 &&
              (toolTipPointLength - 1 < 0 ||
                dd1.date ===
                  pointerDataSelection[toolTipPointLength - 1].data.date)
            ) {
              eventToolTip[j] = {
                metricName: eventSeries[j].metricName,
                data: dd1,
                baseColor: eventSeries[j].baseColor,
              };
              legenTablePointerData[j + legenTablePointerData.length] =
                eventToolTip[j];
              if (dd1.value !== 'False') {
                pointerDataSelection[i] = eventToolTip[j];
                i++;
              }
            } else if (
              dd0 &&
              (toolTipPointLength - 1 < 0 ||
                dd0.date ===
                  pointerDataSelection[toolTipPointLength - 1].data.date)
            ) {
              eventToolTip[j] = {
                metricName: eventSeries[j].metricName,
                data: dd0,
                baseColor: eventSeries[j].baseColor,
              };
              legenTablePointerData[j + legenTablePointerData.length] =
                eventToolTip[j];

              if (dd0.value !== 'False') {
                pointerDataSelection[i] = eventToolTip[j];
                i++;
              }
            }
          }
        }

        pointerDataSelection = pointerDataSelection.slice(0, i);
      }
      if (width < 10) return null;

      showTooltip({
        tooltipData: pointerDataSelection,
        tooltipLeft:
          pointerDataSelection[0] && pointerDataSelection[0].data
            ? dateScale(getDateNum(pointerDataSelection[0].data))
            : 0,
        tooltipTop:
          pointerDataSelection[0] && pointerDataSelection[0].data
            ? valueScale(getValueNum(pointerDataSelection[0].data))
            : 0,
      });
    },
    [
      showTips,
      width,
      showTooltip,
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
  if (showLegend) {
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
          ? '--'
          : getValueStr(linedata.data[linedata.data.length - 1]);

        const avg = '--';

        if (linedata.data !== undefined)
          legenddata[index] = {
            data: [linedata.metricName, avg, curr],
            baseColor: linedata.baseColor,
          };
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
          ? '--'
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
          ? '--'
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
    setfilteredOpenSeries(eventSeries);
  }
  return (
    <div
      onMouseLeave={() => hideTooltip()}
      style={{
        width: width,
        height: height + legendTableHeight,
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

        <PlotLineAreaGraph
          hideBottomAxis={compact}
          showPoints={showPoints}
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
            id={'linearGradient-Brush'}
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
            resizeTriggerAreas={['left', 'right']}
            resetOnEnd
            onBrushEnd={onBrushChange}
            onChange={() => hideTooltip()}
            selectedBoxStyle={{
              fill: 'url(#linearGradient-Brush)',
              stroke: palette.text.primary,
              strokeOpacity: '0.8',
            }}
            onMouseMove={handleTooltip}
            onClick={() => {
              setFilteredSeries(closedSeries);
              setfilteredOpenSeries(openSeries);
              setfilteredEventSeries(eventSeries);
              setAutoRender(true);
            }}
          />
          {showTips && tooltipData && tooltipData[0] && (
            <Line
              key={`${tooltipData[0].metricName}-toolTipLine`}
              from={{ x: dateScale(getDateNum(tooltipData[0].data)), y: 0 }}
              to={{ x: dateScale(getDateNum(tooltipData[0].data)), y: yMax }}
              className={classes.tooltipLine}
            />
          )}
          {showTips && tooltipData && toolTipPointLength >= 1 && (
            <g>
              <circle
                cx={dateScale(getDateNum(tooltipData[0].data))}
                cy={valueScale(getValueNum(tooltipData[0].data))}
                r={5}
                fill={graph.toolTip}
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
      {tooltipData && tooltipData[0] && (
        <div>
          <Tooltip
            top={height}
            left={tooltipLeft}
            className={classes.tooltipDateStyles}
          >
            {
              <div className={classes.tooltipData}>
                <span>{` ${dayjs(
                  new Date(getDateNum(tooltipData[0].data))
                ).format(toolTiptimeFormat)}`}</span>
              </div>
            }
          </Tooltip>
          <Tooltip
            top={tooltipTop + margin.top}
            left={tooltipLeft + margin.left}
            className={classes.tooltipMetric}
          >
            {tooltipData.map((linedata) => (
              <div key={`tooltipName-value- ${linedata.metricName}`}>
                <div className={classes.tooltipData}>
                  <div className={classes.tooltipLabel}>
                    <hr color={linedata.baseColor} className={classes.hr} />
                    <span>{`${linedata.metricName}`}</span>
                  </div>
                  <div className={classes.tooltipValue}>
                    <span>{`${getValueStr(linedata.data)}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </Tooltip>
        </div>
      )}

      {showLegend && (
        <LegendTable
          data={legenddata}
          heading={['Metric Name', 'Avg', 'Curr']}
          width={width}
          height={legendTableHeight}
        />
      )}
    </div>
  );
};
export { ComputationGraph };
