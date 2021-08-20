import { LineMetricSeries, StackBarMetric } from "./base";

const testHandleBarClick = (barData: any) => console.log("barId", barData);
const openSeries: LineMetricSeries = {
  metricName: "probe success",
  data: [
    { date: 100, value: 30 },
    { date: 110, value: 30 },
    { date: 112, value: 30 },
    { date: 130, value: 30 },
    { date: 140, value: 30 },
    { date: 150, value: 30 },
    { date: 160, value: 10 },
  ],
  baseColor: "#5469D4",
};

const barData: StackBarMetric[] = [
  {
    id: "1",
    date: 100,
    passPercentage: 80,
    failPercentage: 20,
    passCount: 10,
    failCount: 20,
  },
  {
    id: "2",
    date: 110,
    passPercentage: 60,
    failPercentage: 40,
    passCount: 1,
    failCount: 1,
  },
  {
    id: "3",
    date: 120,
    passPercentage: 60,
    failPercentage: 40,
    passCount: 1,
    failCount: 1,
  },
  {
    id: "4",
    date: 130,
    passPercentage: 60,
    failPercentage: 40,
    passCount: 1,
    failCount: 1,
  },
  {
    id: "5",
    date: 140,
    passPercentage: 10,
    failPercentage: 90,
    passCount: 1,
    failCount: 1,
  },
  {
    id: "6",
    date: 150,
    passPercentage: 40,
    failPercentage: 60,
    passCount: 1,
    failCount: 1,
  },
  {
    id: "7",
    date: 160,
    passPercentage: 10,
    failPercentage: 90,
    passCount: 1,
    failCount: 1,
  },
];
export { openSeries, barData, testHandleBarClick };
