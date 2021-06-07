import { LineMetricSeries, StackBarMetric } from "./base";

const openSeries: LineMetricSeries = {
  metricName: "probe success",
  data: [
    { date: 10, value: 10 },
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
};

const barData: StackBarMetric[] = [
  {
    runId: "1",
    date: 10,
    passPercentage: "80",
    failPercentage: "20",
    passCount: 10,
    failCount: 20,
  },
  {
    runId: "2",
    date: 20,
    passPercentage: "60",
    failPercentage: "40",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "3",
    date: 30,
    passPercentage: "60",
    failPercentage: "40",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "4",
    date: 40,
    passPercentage: "60",
    failPercentage: "40",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "5",
    date: 50,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "6",
    date: 60,
    passPercentage: "40",
    failPercentage: "60",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "7",
    date: 70,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "8",
    date: 80,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "9",
    date: 90,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "10",
    date: 100,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "11",
    date: 110,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "12",
    date: 110,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "13",
    date: 120,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "14",
    date: 130,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "15",
    date: 140,
    passPercentage: "10",
    failPercentage: "90",
    passCount: 1,
    failCount: 1,
  },
  {
    runId: "16",
    date: 150,
    passPercentage: "80",
    failPercentage: "20",
    passCount: 1,
    failCount: 1,
  },
];
export { openSeries, barData };
