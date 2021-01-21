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
const data22: DataValue[] = [
  { date: 1000, value: 0 },
  { date: 2000, value: 14 },
  { date: 3000, value: 5 },
  { date: 4000, value: 30 },
  { date: 5000, value: 50 },
  { date: 6000, value: 54 },
  { date: 7000, value: 20 },
  { date: 8000, value: 30 },
];
const data3: DataValue[] = [
  { date: 3000, value: 1 },
  { date: 4000, value: 0 },
  { date: 5000, value: 0 },
  { date: 6000, value: 0 },
  { date: 7000, value: 0 },
];
const data4: DataValue[] = [
  { date: 3000, value: 0 },
  { date: 4000, value: 0 },
  { date: 5000, value: 0 },
  { date: 6000, value: 1 },
  { date: 7000, value: 1 },
  { date: 8000, value: 0 },
  { date: 9000, value: 0 },
];
const seriestest1: Array<AreaGrapher> = [
  {
    metricName: 'teal',
    data: data1,
    baseColor: 'teal',
  },
];
const seriestest2: Array<AreaGrapher> = [
  { metricName: 'orange', data: data2, baseColor: 'orange' },
  { metricName: 'pink', data: data22, baseColor: 'pink' },
];
const seriestest3: Array<AreaGrapher> = [
  {
    metricName: 'chaos-pod-delete',
    data: data3,
    baseColor: 'red',
  },
  { metricName: 'chaos-network-pod', data: data4, baseColor: 'yellow' },
];

export { seriestest1, seriestest2, seriestest3 };
