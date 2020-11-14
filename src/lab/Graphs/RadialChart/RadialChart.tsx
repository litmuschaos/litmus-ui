import { Arc, Group, LinearGradient, Text } from '@visx/visx';
import React, { useState } from 'react';
import { LegendData } from '../LineAreaGraph/base';
import { RadialChartProps } from './base';
import { LegendTable } from './LegendTable';
import { useStyles } from './styles';
const green = '#52F995';
const red = '#CA2C2C';

const color = ['#52F995', '#F6B92B', '#CA2C2C'];

export type ChordProps = {
  width: number;
  height: number;
  legendTableHeight?: number;
  centerSize?: number;
  events?: boolean;
  showOuterArc?: boolean;
  semiCircle?: boolean;
  showArc?: boolean;
  showLegend?: boolean;
  radialData: RadialChartProps[];
};

const RadialChart = ({
  width,
  height,
  radialData,
  centerSize = 30,
  showOuterArc = true,
  semiCircle = true,
  showArc = true,
  legendTableHeight = 150,
  showLegend = true,
}: ChordProps) => {
  let legenddata: Array<LegendData> = [{ value: [] }];
  const classes = useStyles();
  const [centerDataValue, setCenterDataValue] = useState<string>('NoData');
  const circleOrient = semiCircle ? 1 : 2;
  const scalerArc: number = circleOrient * Math.PI;

  console.log(centerDataValue);
  const startAngle: number = -(Math.PI / 2);
  let currentAngle: number = startAngle;
  const outerRadius =
    (circleOrient == 1 ? Math.max(width, height) : Math.min(width, height)) *
      0.5 -
    centerSize;
  const innerRadius = outerRadius - centerSize;

  const total = radialData
    ? radialData.reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0
      )
    : NaN;
  // console.log(total);
  const radialArc = radialData
    ? radialData.map((elem) => {
        return {
          value: (total ? elem.value / total : 0) * scalerArc,
          lable: elem.lable,
        };
      })
    : [{ value: NaN, lable: '' }];
  if (centerDataValue === 'NoData' && total > 0) {
    setCenterDataValue(total.toString());
  }

  // console.log(radialArc);
  legenddata = legenddata.splice(0);
  if (radialData) {
    radialData.map((element, index) => {
      if (element.value !== undefined)
        legenddata[index] = {
          value: [element.lable, element.value.toString()],
        };
    });
  }
  return width < 10 ? null : (
    <div className="chords">
      <svg width={width} height={height}>
        <LinearGradient
          id="gpinkorange"
          from={green}
          to={red}
          vertical={false}
        />

        <rect
          width={width}
          height={height}
          className={classes.rectBase}
          rx={14}
        />

        <Group top={circleOrient == 1 ? height : height / 2} left={width / 2}>
          {showArc &&
            total > 0 &&
            radialArc &&
            radialArc.map((elem, i) => (
              <Arc
                className={classes.radicalArc}
                cornerRadius={2}
                padAngle={0.02}
                key={`key-${i}`}
                data={true}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill={color[i % 3]}
                startAngle={currentAngle}
                endAngle={(currentAngle += elem.value)}
                onMouseEnter={() =>
                  setCenterDataValue(radialData[i].value.toString())
                }
                onMouseLeave={() => setCenterDataValue(total.toString())}
              />
            ))}
          {(currentAngle = Math.PI)}
          {showArc && (total == 0 || isNaN(total)) && (
            <Arc
              cornerRadius={2}
              padAngle={0.02}
              key={`key-something-something`}
              data={true}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill={'#2B333B'}
              startAngle={startAngle}
              endAngle={circleOrient == 1 ? Math.PI / 2 : 2 * Math.PI}
            />
          )}
          {showOuterArc && (
            <Arc
              cornerRadius={2}
              padAngle={0.02}
              key={`key-something-122`}
              data={true}
              innerRadius={outerRadius + 10}
              outerRadius={outerRadius + 15}
              fill={
                total == 0 || isNaN(total) ? '#2B333B' : 'url(#gpinkorange)'
              }
              startAngle={startAngle}
              endAngle={circleOrient * Math.PI}
            />
          )}
          <Group
            id={'test-text'}
            left={-14 * centerDataValue.toString().length}
            top={circleOrient == 1 ? -8 : 16}
          >
            <Text className={classes.centerDataValue}>{centerDataValue}</Text>
          </Group>
        </Group>
      </svg>
      {showLegend && (
        <LegendTable
          data={legenddata}
          heading={['', 'Count']}
          width={width}
          height={legendTableHeight}
        />
      )}
    </div>
  );
};

export { RadialChart };
