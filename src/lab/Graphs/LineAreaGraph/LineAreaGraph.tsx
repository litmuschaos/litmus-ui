import { Bounds } from '@visx/brush/lib/types';
import {
  Brush,
  defaultStyles,
  Line,
  localPoint,
  scaleLinear,
  scaleTime,
  Tooltip,
  useTooltip,
} from '@visx/visx';
import { bisector, extent, max } from 'd3-array';
import React, { useCallback, useMemo, useState } from 'react';
import { AreaGrapher, DataValue, LegendData } from './base';
import { LegendTable } from './LegendTable';
import { PlotLineAreaGraph } from './PlotLineAreaGraph';
import { useStyles } from './styles';
type TooltipData = Array<AreaGrapher>;
// Initialize some variables
let containerX: number;
let containerY: number;
let dd1: DataValue;
let dd0: DataValue;
let i: number;
let j: number;
let indexer: number;

const legenddata: Array<LegendData> = [{ value: [] }];
const dd3: AreaGrapher[] = [{ metricName: '', data: [] }];
const bisectDate = bisector<DataValue, Date>((d) => new Date(d.date * 1000))
  .left;

const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const chartSeparation = 10;
export const accentColorDark = '#08BBD7';

export const blue = '#0098DD';
const colorArr: string[] = ['#08BBD7', '#F6B92B', '#E73939', '#AD51C3', '#FFF'];
const colorCount = 5;

const tooltipStyles = {
  ...defaultStyles,
  background: '#0A1818',
  border: '1px solid white',
  color: 'white',
};

// accessors
const getDate = (d: DataValue) => new Date(d.date * 1000);
const getValue = (d: DataValue) => d.value;

export type AreaGraphProps = {
  closedSeries: Array<AreaGrapher>;
  openSeries: Array<AreaGrapher>;
  showPoints?: boolean;
  showGrid?: boolean;
  showLegend?: true;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  compact?: boolean;
  legendTableHeight?: number;
};

const LineAreaGraph: React.FC<AreaGraphProps> = ({
  compact = false,
  closedSeries,
  openSeries,
  showPoints = true,
  showGrid = true,
  showLegend = true,
  width = 200,
  height = 200,
  margin = {
    top: 20,
    left: 30,
    bottom: 20,
    right: 30,
  },
  legendTableHeight = 200,
}) => {
  const classes = useStyles({ width, height });
  const [filteredClosedSeries, setFilteredSeries] = useState(closedSeries);
  const [filteredOpenSeries, setfilteredOpenSeries] = useState(openSeries);
  const closedSeriesCount = filteredClosedSeries
    ? filteredClosedSeries.length
    : 0;

  // const openSeriesCount = filteredOpenSeries ? filteredOpenSeries.length : 0;

  const onBrushChange = useCallback(
    (domain: Bounds | null) => {
      if (!domain) return;
      const { x0, x1, y0, y1 } = domain;
      if (filteredClosedSeries) {
        const seriesCopy = filteredClosedSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDate(s).getTime();
              const y = getValue(s);
              return x > x0 && x < x1 && y > y0 && y < y1;
            })
          )
          .map((data, i) => ({
            metricName: filteredClosedSeries[i].metricName,
            data: data,
          }));

        // .reduce((rec, d) => rec.concat(d), []);

        setFilteredSeries(seriesCopy);
      }

      if (filteredOpenSeries) {
        const seriesCopy = filteredOpenSeries
          .map((lineData) =>
            lineData.data.filter((s) => {
              const x = getDate(s).getTime();
              const y = getValue(s);
              return x > x0 && x < x1 && y > y0 && y < y1;
            })
          )
          .map((data, i) => ({
            metricName: filteredOpenSeries[i].metricName,
            data: data,
          }));

        // .reduce((rec, d) => rec.concat(d), []);

        setfilteredOpenSeries(seriesCopy);
      }
    },
    [filteredClosedSeries, filteredOpenSeries]
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
          filteredClosedSeries
            .map((linedata) => linedata.data)
            .reduce((rec, d) => rec.concat(d), [])
            .concat(
              filteredOpenSeries
                .map((linedata) => linedata.data)
                .reduce((rec, d) => rec.concat(d), [])
            ),
          getDate
        ) as [Date, Date],
      }),
    [xMax, filteredClosedSeries, filteredOpenSeries]
  );

  const valueScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [
          0,
          max(
            filteredClosedSeries
              .map((linedata) => linedata.data)
              .reduce((rec, d) => rec.concat(d), [])
              .concat(
                filteredOpenSeries
                  .map((linedata) => linedata.data)
                  .reduce((rec, d) => rec.concat(d), [])
              ),
            getValue
          ) || 0,
        ],
        nice: true,
      }),
    [yMax, filteredClosedSeries, filteredOpenSeries]
  );

  //ToolTip Data
  const {
    showTooltip,
    hideTooltip,

    tooltipData,
  } = useTooltip<TooltipData>({
    // initial tooltip state
    tooltipOpen: true,
  });
  const getSum = (total: number, num: number) => {
    return total + num;
  };

  // tooltip handler
  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      let { x } = localPoint(event) || { x: 0 };
      x = x - 50;
      const x0 = dateScale.invert(x);

      containerX = 'clientX' in event ? event.clientX : 0;
      containerY = 'clientY' in event ? event.clientY : 0;

      if (closedSeries) {
        for (i = 0; i < closedSeries.length; i++) {
          indexer = bisectDate(closedSeries[i].data, x0, 1);
          dd0 = closedSeries[i].data[indexer - 1];
          dd1 = closedSeries[i].data[indexer];

          if (dd1) {
            dd3[i] =
              x0.valueOf() - getDate(dd0).valueOf() >
              getDate(dd1).valueOf() - x0.valueOf()
                ? { metricName: closedSeries[i].metricName, data: [dd1] }
                : { metricName: closedSeries[i].metricName, data: [dd0] };
          }
        }
      }

      if (openSeries) {
        for (j = 0; j < openSeries.length; j++) {
          indexer = bisectDate(openSeries[j].data, x0, 1);
          dd0 = openSeries[j].data[indexer - 1];
          dd1 = openSeries[j].data[indexer];

          if (dd1) {
            dd3[i] =
              x0.valueOf() - getDate(dd0).valueOf() >
              getDate(dd1).valueOf() - x0.valueOf()
                ? { metricName: openSeries[j].metricName, data: [dd1] }
                : { metricName: openSeries[j].metricName, data: [dd0] };
            i++;
          }
        }
      }
      if (width < 10) return null;

      showTooltip({
        tooltipData: dd3,
      });
    },
    [showTooltip, dateScale, closedSeries, openSeries, width]
  );
  {
    filteredClosedSeries &&
      filteredClosedSeries.map((linedata, index) => {
        legenddata[index] = {
          value: [
            linedata.metricName,
            (
              linedata.data.map((d) => d.value).reduce(getSum, 0) /
              linedata.data.length
            ).toString(),
            closedSeries[index].data[
              closedSeries[index].data.length - 1
            ].value.toString(),
          ],
        };
      });
  }
  {
    filteredOpenSeries &&
      filteredOpenSeries.map((linedata, index) => {
        legenddata[index + closedSeriesCount] = {
          value: [
            linedata.metricName,
            (
              linedata.data.map((d) => d.value).reduce(getSum, 0) /
              linedata.data.length
            ).toString(),
            openSeries[index].data[
              openSeries[index].data.length - 1
            ].value.toString(),
          ],
        };
      });
  }
  return (
    <div>
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
          width={width - 20}
          height={yMax}
          margin={{ ...margin, bottom: topChartBottomMargin }}
          yMax={yMax}
          xMax={xMax}
          xScale={dateScale}
          yScale={valueScale}
          showGrid={showGrid}
        >
          <Brush
            key={'brush'}
            xScale={dateScale}
            yScale={valueScale}
            width={xMax}
            height={yMax}
            margin={brushMargin}
            handleSize={8}
            resizeTriggerAreas={['left', 'right']}
            resetOnEnd={true}
            onBrushEnd={onBrushChange}
            onChange={() => hideTooltip()}
            onClick={() => {
              setFilteredSeries(closedSeries);
              setfilteredOpenSeries(openSeries);
            }}
            selectedBoxStyle={{
              fill: 'white',
              stroke: 'white',
              fillOpacity: '0.2',
            }}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData &&
            dd3.map((d, i) => (
              <g key={`${i}-tooltip`}>
                <Line
                  from={{ x: dateScale(getDate(d.data[0])), y: 0 }}
                  to={{ x: dateScale(getDate(d.data[0])), y: yMax }}
                  className={classes.tooltipLine}
                />
                <circle
                  cx={dateScale(getDate(d.data[0]))}
                  cy={valueScale(getValue(d.data[0]))}
                  r={7}
                  fill={colorArr[i % colorCount]}
                  fillOpacity={0.5}
                  stroke="white"
                  strokeOpacity={0.5}
                  strokeWidth={2}
                  pointerEvents="none"
                />
              </g>
            ))}
          k
        </PlotLineAreaGraph>
      </svg>
      {tooltipData && (
        <Tooltip top={containerY} left={containerX + 30} style={tooltipStyles}>
          {dd3.map((d, i) => (
            <div style={{ padding: '5px', display: 'flex' }} key={`bb- ${i}`}>
              <div className={classes.tooltipData}>
                <hr color={colorArr[i % colorCount]} className={classes.hr} />
                <span style={{ color: 'white', paddingLeft: '0.5em' }}>{`${
                  d.metricName
                }:  ${getValue(d.data[0]).toString()}`}</span>
              </div>
            </div>
          ))}
        </Tooltip>
      )}

      {showLegend && (
        <LegendTable
          data={legenddata}
          heading={['', 'Avg', 'Curr']}
          width={width}
          height={legendTableHeight}
        />
      )}
    </div>
  );
};

export { LineAreaGraph };
