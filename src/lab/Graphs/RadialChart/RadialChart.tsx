import { useTheme } from '@material-ui/core';
import { Arc, Group } from '@visx/visx';
import React, { useState } from 'react';
import { LegendData } from '../LegendTable/base';
import { LegendTable } from '../LegendTable/LegendTable';
import { RadialChartProps } from './base';
import { useStyles } from './styles';

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
  heading?: string;
  circleExpandOnHover?: number;
};

const RadialChart = ({
  width,
  height,
  radialData,
  centerSize = 20,
  semiCircle = false,
  showArc = true,
  legendTableHeight = 150,
  showLegend = true,
  heading,
  circleExpandOnHover = 5,
}: ChordProps) => {
  const { palette } = useTheme();

  let legenddata: Array<LegendData> = [{ data: [] }];
  const [centerValue, setcenterValue] = useState<string>('0');
  const [centerText, setCenterText] = useState<string>(heading ?? '');
  const [currentHovered, setcurrentHovered] = useState<string>('');

  const circleOrient = semiCircle ? 1 : 2;
  const classes = useStyles({ width, height, circleOrient });
  const scalerArc: number = circleOrient * Math.PI;
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
  const radialArc: RadialChartProps[] = radialData
    ? radialData.map((elem) => {
        return {
          value: (total ? elem.value / total : 0) * scalerArc,
          label: elem.label,
          baseColor: elem.baseColor,
        };
      })
    : [{ value: NaN, label: '' }];
  if (centerValue === '0' && total > 0) {
    setcenterValue(total.toString());
    setCenterText(heading ?? '');
  }

  legenddata = legenddata.splice(0);
  if (radialData) {
    radialData.map((element, index) => {
      if (element.value !== undefined)
        legenddata[index] = {
          data: [element.label, element.value.toString()],
          baseColor: element.baseColor,
        };
    });
  }
  return width < 10 ? null : (
    <div style={{ width: width, height: height }} id="radialChart-root">
      <div>
        <svg width={width} height={height}>
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
                <g key={`${elem.label}-arc-group`}>
                  <Arc
                    id={`${elem.label}-arc`}
                    data={true}
                    innerRadius={
                      currentHovered === `${elem.label}-arc`
                        ? innerRadius - circleExpandOnHover
                        : innerRadius
                    }
                    outerRadius={
                      currentHovered === `${elem.label}-arc`
                        ? outerRadius + circleExpandOnHover
                        : outerRadius
                    }
                    fill={elem.baseColor}
                    startAngle={currentAngle}
                    endAngle={(currentAngle += elem.value)}
                    onMouseEnter={(e) => {
                      setcenterValue(radialData[i].value.toString());
                      setCenterText(`${elem.label}`);
                      setcurrentHovered(
                        e.currentTarget.getAttribute('id')?.toString() ?? ''
                      );
                    }}
                    onMouseLeave={() => {
                      setcenterValue(total.toString());
                      setCenterText(`${heading}`);
                      setcurrentHovered('');
                    }}
                    opacity={
                      currentHovered === ''
                        ? 1
                        : currentHovered === `${elem.label}-arc`
                        ? 1
                        : 0.7
                    }
                  />
                </g>
              ))}

            {(currentAngle = Math.PI)}
            {showArc && (total == 0 || isNaN(total)) && (
              <Arc
                cornerRadius={2}
                padAngle={0.02}
                data={true}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill={palette.disabledBackground}
                startAngle={startAngle}
                endAngle={circleOrient == 1 ? Math.PI / 2 : 2 * Math.PI}
              />
            )}
          </Group>
        </svg>
        <div className={classes.centerDataContainer}>
          <p className={`${classes.centerValue} ${classes.centerDataFont}`}>
            {centerValue}
          </p>
          <p className={`${classes.centerText} ${classes.centerDataFont}`}>
            {centerText}
          </p>
        </div>
        {showLegend && (
          <LegendTable
            data={legenddata}
            width={width}
            height={legendTableHeight}
          />
        )}
      </div>
    </div>
  );
};

export { RadialChart };
