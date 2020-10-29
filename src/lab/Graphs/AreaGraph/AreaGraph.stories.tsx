import { storiesOf } from '@storybook/react';
import React from 'react';
import { ThemedBackground } from '../../../utils/storybook';
import { AreaGraph } from './AreaGraph';
import { AreaGrapher, DataValue } from './base';

const data1: DataValue[] = [
  { date: 1000, value: 20 },
  { date: 2000, value: 30 },
  { date: 3000, value: 35 },
  { date: 4000, value: 40 },
  { date: 5000, value: 50 },
  { date: 6000, value: 74 },
  { date: 7000, value: 30 },
  { date: 8000, value: 10 },
];
const data2: DataValue[] = [
  { date: 1000, value: 40 },
  { date: 2000, value: 10 },
  { date: 3000, value: 55 },
  { date: 4000, value: 60 },
  { date: 5000, value: 20 },
  { date: 6000, value: 14 },
  { date: 7000, value: 60 },
  { date: 8000, value: 10 },
];

const seriestest: Array<AreaGrapher> = [
  { metricName: 'chaos-exporter', data: data1 },
];
const seriestest2: Array<AreaGrapher> = [{ metricName: 'heptio', data: data2 }];

storiesOf('Graphs/Area', module)
  // Litmus Portal
  .add('Kubera Chaos', () => (
    <ThemedBackground platform="kubera-chaos">
      <AreaGraph
        width={600}
        height={400}
        closedSeries={seriestest}
        openSeries={seriestest2}
        showPoints={true}
      />
    </ThemedBackground>
  ));
