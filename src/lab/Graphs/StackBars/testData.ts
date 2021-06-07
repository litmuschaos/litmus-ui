import { DateValue, GraphMetric } from "./base";
import { StackBarMetric } from "./PlotStackBar";

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

const openSeries: GraphMetric[] = [
  {
    metricName: "probe success",
    data: [
      { date: 10, value: NaN },
      { date: 20, value: 10 },
      { date: 30, value: 1 },
      { date: 40, value: 20 },
      { date: 50, value: 10 },
      { date: 60, value: 15 },
      { date: 70, value: 30 },
      { date: 80, value: 30 },
      { date: 90, value: 30 },
      { date: 100, value: 30 },
      { date: 110, value: 30 },
      { date: 120, value: 30 },
      { date: 130, value: 30 },
      { date: 140, value: 30 },
      { date: 150, value: 30 },
    ],
    baseColor: "#5469D4",
  },
];

const barData: StackBarMetric[] = [
  {
    date: "10",
    pass: "33",
    fail: "67",
    passCount: 10,
    failCount: 20,
  },
  {
    date: "20",
    pass: "60",
    fail: "40",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "30",
    pass: "60",
    fail: "40",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "40",
    pass: "60",
    fail: "40",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "50",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "60",
    pass: "40",
    fail: "60",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "70",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "80",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "90",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "100",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "110",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "110",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "120",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "130",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "140",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    date: "150",
    pass: "10",
    fail: "90",
    passCount: 1,
    failCount: 1,
  },
];
export { barSeriesData, closedSeriesData, openSeries, barData };
