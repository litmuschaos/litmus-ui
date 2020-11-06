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

const seriestest1: Array<AreaGrapher> = [
  { metricName: 'chaos-exporter', data: data1 },
];
const seriestest2: Array<AreaGrapher> = [{ metricName: 'heptio', data: data2 }];

export { seriestest1, seriestest2 };
