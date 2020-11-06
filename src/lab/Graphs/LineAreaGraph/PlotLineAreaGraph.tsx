import { AxisBottom, AxisLeft, AxisRight, AxisScale } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { MarkerCircle } from '@visx/marker';
import { AreaClosed, LinePath } from '@visx/shape';
import React from 'react';
import { AreaGrapher, DataValue } from './base';
import { useStyles } from './styles';
// Initialize some variables
const axisColor = '#fff';

const colorArr: string[] = ['#08BBD7', '#F6B92B', '#E73939', '#AD51C3', '#FFF'];

const colorCount = 4;
const axisBottomTickLabelProps = {
  textAnchor: 'middle' as const,
  fontFamily: 'Arial',
  fontSize: 10,
  fill: axisColor,
};
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Ubuntu',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
};
const axisRightTickLabelProps = {
  dx: '1.25em',
  dy: '0.25em',
  fontFamily: 'Ubuntu',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
};

// accessors
const getDate = (d: DataValue) => new Date(d.date * 1000);
const getStockValue = (d: DataValue) => d.value;

interface AreaChartProps {
  data?: Array<AreaGrapher>;
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  closedSeries: Array<AreaGrapher>;
  openSeries: Array<AreaGrapher>;
  showGrid?: boolean;
  width: number;
  height: number;
  yMax: number;
  xMax: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  hideBottomAxis?: boolean;
  hideLeftAxis?: boolean;
  hideRightAxis?: boolean;
  top?: number;
  left?: number;
  showPoints: boolean;
}

const PlotLineAreaGraph: React.FC<AreaChartProps> = ({
  height,
  width,
  closedSeries,
  openSeries,
  yMax,
  xMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  hideRightAxis = false,
  top,
  left,
  children,
  showPoints = true,
  showGrid = true,
}) => {
  const classes = useStyles();
  if (width < 10) return null;

  return (
    <Group left={left || margin?.left} top={top || margin?.top}>
      {closedSeries.length > 0 &&
        closedSeries.map((linedata, i) => (
          <Group key={`${i}-group`}>
            <LinearGradient
              id={`${i}-linearGragient`}
              from={colorArr[i % colorCount]}
              to={colorArr[i % colorCount]}
              fromOpacity={0.5}
              toOpacity={0.1}
            />
            {showGrid && (
              <Group>
                <GridRows
                  scale={yScale}
                  width={xMax}
                  className={classes.grid}
                  pointerEvents="none"
                />
                <GridColumns
                  scale={xScale}
                  height={height}
                  className={classes.grid}
                  pointerEvents="none"
                />
              </Group>
            )}
            <AreaClosed<DataValue>
              key={`${i}-line`}
              data={linedata.data}
              x={(d) => xScale(getDate(d)) || 0}
              y={(d) => yScale(getStockValue(d)) || 0}
              yScale={yScale}
              strokeWidth={2}
              stroke={colorArr[i % colorCount]}
              fill={`url(#${i}-linearGragient)`}
              curve={curveMonotoneX}
            />

            {showPoints &&
              linedata.data.map((d, j) => (
                <g key={`test-oot-${i}-${j}`}>
                  <circle
                    cx={xScale(getDate(d))}
                    cy={yScale(getStockValue(d))}
                    r={5}
                    fill={colorArr[i % colorCount]}
                    fillOpacity={0.7}
                    pointerEvents="none"
                  />
                </g>
              ))}
          </Group>
        ))}
      {openSeries.length > 0 &&
        openSeries.map((openLineData, j) => (
          <g key={`${j}-group-open`}>
            <MarkerCircle
              id={`${j}-circle`}
              fill={
                colorArr[
                  (j + (closedSeries ? closedSeries.length : 0)) % colorCount
                ]
              }
              size={2.5}
              refX={2.5}
              fillOpacity={0.6}
            />
            <LinePath<DataValue>
              data={openLineData.data}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScale(getStockValue(d)) ?? 0}
              strokeWidth={2}
              stroke={
                colorArr[
                  (j + (closedSeries.length ? closedSeries.length : 0)) %
                    colorCount
                ]
              }
              strokeOpacity={0.7}
              curve={curveMonotoneX}
              markerMid={showPoints ? `url(#${j}-circle)` : undefined}
              markerStart={showPoints ? `url(#${j}-circle)` : undefined}
              markerEnd={showPoints ? `url(#${j}-circle)` : undefined}
            />
          </g>
          // (console.log(lineIndex))
        ))}
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 6 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisLeftTickLabelProps}
        />
      )}
      {!hideRightAxis && (
        <AxisRight
          left={width - 40}
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisRightTickLabelProps}
        />
      )}
      {children}
    </Group>
  );
};

export { PlotLineAreaGraph };
