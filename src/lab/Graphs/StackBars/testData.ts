import { DateValue, GraphMetric } from "./base";

const openSeriesData1: DateValue[] = [
  { date: 4000.0, value: 40 },
  { date: 5000.0, value: 50 },
  { date: 6000.0, value: 60 },
  { date: 7000.0, value: 30 },
  { date: 8000.0, value: 10 },
];
const closedSeriesData1: DateValue[] = [
  { date: 4000.0, value: 6000 },
  { date: 5000.0, value: 20 },
  { date: 6000.0, value: -14 },
  { date: 7000.0, value: -60 },
  { date: 8000.0, value: 10 },
];
const closedSeriesData2: DateValue[] = [
  { date: 4000, value: 30 },
  { date: 5000, value: 50 },
  { date: 6000, value: 54 },
  { date: 7000, value: 20 },
  { date: 8000, value: 30 },
];

const barSeriesData: Array<GraphMetric> = [
  {
    metricName: "teal",
    data: openSeriesData1,
    baseColor: "teal",
  },
];
const closedSeriesData: Array<GraphMetric> = [
  { metricName: "orange", data: closedSeriesData1, baseColor: "purple" },
];

export { barSeriesData, closedSeriesData };
