import { Brush } from '@visx/brush';
import { Bounds } from '@visx/brush/lib/types';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { scaleLinear, scaleTime } from '@visx/scale';
import { Line } from '@visx/shape';
import { defaultStyles, Tooltip, useTooltip } from '@visx/tooltip';
import { bisector, extent, max } from 'd3-array';
import React, { useCallback, useMemo, useState } from 'react';
import { AreaChart } from './AreaChart';
import { AreaGrapher, DataValue } from './base';

type TooltipData = Array<AreaGrapher>;
// Initialize some variables
let containerX: number;
let containerY: number;
let dd1: DataValue;
let dd0: DataValue;

let i: number;

let j: number;
let indexer: number;
const a: AreaGrapher = {
  metricName: 'metric11',
  data: [{ date: 10, value: 10 }],
};
const dd3: AreaGrapher[] = [a];
const bisectDate = bisector<DataValue, Date>((d) => new Date(d.date * 1000))
  .left;

const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const chartSeparation = 30;
export const accentColorDark = '#08BBD7';
export const accentColor = '#f6acc8';
export const background = '#0A1818';
export const background2 = '#0A1818';
export const accentColor1 = '#08BBD7';
export const accentColor2 = '#F6B92B';
export const accentColor3 = '#E73939';
export const accentColor4 = '#AD51C3';
export const accentColor5 = '#FFF';
const colorArr: string[] = [
  accentColor1,
  accentColor2,
  accentColor3,
  accentColor4,
  accentColor,
];
const colorCount = 5;
const selectedBrushStyle = {
  fill: `url(#${13}-linearGragient)`,
  stroke: 'white',
};
const tooltipStyles = {
  ...defaultStyles,
  background,
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
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  compact?: boolean;
};

const AreaGraph: React.FC<AreaGraphProps> = ({
  compact = false,
  closedSeries,
  openSeries,
  showPoints = true,
  showGrid = true,
  width = 200,
  height = 200,
  margin = {
    top: 20,
    left: 30,
    bottom: 20,
    right: 30,
  },
}) => {
  // const [filteredSeries, setFilteredStock] = useState(series);
  const [filteredClosedSeries, setFilteredSeries] = useState(closedSeries);
  const [filteredOpenSeries, setfilteredOpenSeries] = useState(openSeries);

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
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;

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

    // tooltipData: 'Move me with your mouse or finger',
  });
  // tooltip handler
  const handleTooltip = useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      let { x } = localPoint(event) || { x: 0 };
      x = x - 50;
      //   y = y - shiftT;
      const x0 = dateScale.invert(x);

      containerX = 'clientX' in event ? event.clientX : 0;
      containerY = 'clientY' in event ? event.clientY : 0;

      if (closedSeries) {
        for (i = 0; i < closedSeries.length; i++) {
          indexer = bisectDate(closedSeries[i].data, x0, 1);
          // console.log("indeex", indexer);
          dd0 = closedSeries[i].data[indexer - 1];
          dd1 = closedSeries[i].data[indexer];

          // console.log(dd0);
          if (dd1) {
            dd3[i] =
              x0.valueOf() - getDate(dd0).valueOf() >
              getDate(dd1).valueOf() - x0.valueOf()
                ? { metricName: closedSeries[i].metricName, data: [dd1] }
                : { metricName: closedSeries[i].metricName, data: [dd0] };
          }
        }
        // console.log("dd3", dd3);
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
      // console.log(dd3);
      if (width < 10) return null;

      showTooltip({
        tooltipData: dd3,
      });
    },
    [showTooltip, dateScale, closedSeries, openSeries, width]
  );
  //tooltip end
  // console.log(filteredSeries);
  return (
    <div>
      <svg width={width} height={height}>
        <LinearGradient
          id="area-background-gradient"
          from={background}
          to={background2}
        />
        <LinearGradient
          id={`${13}-linearGragient`}
          from={'white'}
          to={'white'}
          fromOpacity={0.5}
          toOpacity={0.1}
        />
        <rect
          x={0}
          y={0}
          width={width}
          height={yMax + margin.top + margin.bottom + 10}
          fill="url(#area-background-gradient)"
          // fill={"blue"}
        />

        <AreaChart
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
          gradientColor={background2}
          showGrid={showGrid}
        >
          <Brush
            key={'hee'}
            xScale={dateScale}
            yScale={valueScale}
            width={xMax}
            height={yMax}
            margin={brushMargin}
            handleSize={8}
            resizeTriggerAreas={['left', 'right']}
            // brushDirection="horizontal"
            // initialBrushPosition={initialBrushPosition}
            resetOnEnd={true}
            onBrushEnd={onBrushChange}
            onChange={() => hideTooltip()}
            onClick={() => {
              setFilteredSeries(closedSeries);
              setfilteredOpenSeries(openSeries);
            }}
            selectedBoxStyle={selectedBrushStyle}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {tooltipData &&
            dd3.map((d, i) => (
              <g key={`${i}-tooltip`}>
                {/* vertical line for toolitip */}
                <Line
                  from={{ x: dateScale(getDate(d.data[0])), y: 0 }}
                  to={{ x: dateScale(getDate(d.data[0])), y: yMax }}
                  stroke={accentColorDark}
                  strokeWidth={2}
                  pointerEvents="none"
                  strokeDasharray="5,2"
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
        </AreaChart>
      </svg>
      {tooltipData && (
        <Tooltip top={containerY} left={containerX + 30} style={tooltipStyles}>
          {dd3.map((d, i) => (
            <div style={{ padding: '5px', display: 'flex' }} key={`bb- ${i}`}>
              <div
                style={{
                  float: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <hr
                  color={colorArr[i % colorCount]}
                  style={{ width: '10px', height: '1px' }}
                />
                <span style={{ color: 'white', paddingLeft: '0.5em' }}>{`${
                  d.metricName
                }:  ${getValue(d.data[0]).toString()}`}</span>
              </div>
            </div>
          ))}
        </Tooltip>
      )}
    </div>
  );
};

export { AreaGraph };
