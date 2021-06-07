import { DateValue, GraphMetric } from "../../Graphs/LineAreaGraph";

const openSeriesData1: DateValue[] = [
  { date: 4000.0, value: 40 },
  { date: 5000.0, value: 50 },
  { date: 6000.0, value: 74 },
  { date: 7000.0, value: 30 },
  { date: 8000.0, value: 10 },
];
const closedSeriesData1: DateValue[] = [
  { date: 4000.0, value: 60 },
  { date: 5000.0, value: 20 },
  { date: 6000.0, value: -14 },
  { date: 7000.0, value: -60 },
  { date: 8000.0, value: 10 },
  { date: 9000.0, value: 0 },
  { date: 10000.0, value: 0 },
];
const closedSeriesData2: DateValue[] = [
  { date: 4000, value: 30 },
  { date: 5000, value: 50 },
  { date: 6000, value: 54 },
  { date: 7000, value: 20 },
  { date: 8000, value: 30 },
];
const eventSeriesData1: DateValue[] = [
  { date: 1000, value: 0 },
  { date: 2000, value: 0 },
  { date: 3000, value: 1 },
  { date: 4000, value: 1 },
  { date: 5000, value: 1 },
  { date: 6000, value: 1 },
  { date: 7000, value: 0 },
  { date: 8000, value: 0 },
];
const eventSeriesData2: DateValue[] = [
  { date: 0.0, value: 1 },
  { date: 1000.0, value: 1 },
  { date: 2000.0, value: 0 },
  { date: 3000.0, value: 0 },
  { date: 4000.0, value: 0 },
  { date: 5000.0, value: 1 },
  { date: 6000.0, value: 1 },
  { date: 7000.0, value: 1 },
  { date: 8000.0, value: 1 },
  { date: 9000.0, value: 0 },
  { date: 10000.0, value: 0 },
  { date: 11000.0, value: 1 },
  { date: 12000.0, value: 1 },
  { date: 13000.0, value: 1 },
  { date: 14000.0, value: 0 },
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
  { metricName: "noColorAssigned-1", data: closedSeriesData2 },
];
const eventSeriesData: Array<GraphMetric> = [
  {
    metricName: "chaos-pod-delete-no-color",
    data: eventSeriesData1,
    subData: [
      { subDataName: "subData-0-1", value: "0-1", date: 3000 },
      { subDataName: "subData-0-2", value: "0-2", date: 3000 },
      { subDataName: "subData-0-3", value: "0-3", date: 3000 },
      { subDataName: "subData-0-4", value: "0-4", date: 3000 },
    ],
  },
  {
    metricName: "chaos-network-pod",
    data: eventSeriesData2,
    subData: [
      { subDataName: "subData-1-1", value: "1-1", date: 5000 },
      { subDataName: "subData-1-2", value: "1-2", date: 5000 },
      { subDataName: "subData-2-1", value: "2-1", date: 11000 },
      { subDataName: "subData-2-2", value: "2-2", date: 11000 },
      { subDataName: "subData-2-3", value: "2-3", date: 11000 },
      { subDataName: "subData-2-4", value: "2-4", date: 11000 },
    ],
    baseColor: "blue",
  },
];

export { eventSeriesData, openSeriesData, closedSeriesData };
