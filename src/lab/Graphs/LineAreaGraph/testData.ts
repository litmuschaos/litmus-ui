import { DateValue, GraphMetric } from "../../Graphs/LineAreaGraph";

const openSeriesData1: DateValue[] = [
  { date: 1000, value: 20 },
  { date: 2000, value: 30 },
  { date: 3000, value: 35 },
  { date: 4000, value: 40 },
  { date: 5000, value: 50 },
  { date: 6000, value: 74 },
  { date: 7000, value: 30 },
  { date: 8000, value: 10 },
];
const closedSeriesData1: DateValue[] = [
  { date: 1000, value: 40 },
  { date: 2000, value: 10 },
  { date: 3000, value: 55 },
  { date: 4000, value: 60 },
  { date: 5000, value: 20 },
  { date: 6000, value: -14 },
  { date: 7000, value: -60 },
  { date: 8000, value: 10 },
];
const closedSeriesData2: DateValue[] = [
  { date: 1000, value: 0 },
  { date: 2000, value: 14 },
  { date: 3000, value: 5 },
  { date: 4000, value: 30 },
  { date: 5000, value: 50 },
  { date: 6000, value: 54 },
  { date: 7000, value: 20 },
  { date: 8000, value: 30 },
];
const eventSeriesData1: DateValue[] = [
  { date: 3000, value: 1 },
  { date: 4000, value: 0 },
  { date: 5000, value: 0 },
  { date: 6000, value: 0 },
  { date: 7000, value: 0 },
];
const eventSeriesData2: DateValue[] = [
  { date: 3000, value: 1 },
  { date: 4000, value: 1 },
  { date: 5000, value: 0 },
  { date: 6000, value: 0 },
  { date: 7000, value: 1 },
  { date: 8000, value: 1 },
  { date: 9000, value: 0 },
];
const openSeriesData: Array<GraphMetric> = [
  {
    metricName: "teal",
    data: openSeriesData1,
    baseColor: "teal",
  },
];
const closedSeriesData: Array<GraphMetric> = [
  { metricName: "orange", data: closedSeriesData1, baseColor: "orange" },
  { metricName: "pink", data: closedSeriesData2, baseColor: "pink" },
];
const eventSeriesData: Array<GraphMetric> = [
  {
    metricName:
      "chaos-pod-delete-chaos-pod-delete-chaos-pod-delete-chaos-pod-delete",
    data: eventSeriesData1,
    baseColor: "red",
  },
  {
    metricName: "chaos-network-pod",
    data: eventSeriesData2,
    baseColor: "yellow",
  },
];

export { eventSeriesData, openSeriesData, closedSeriesData };
