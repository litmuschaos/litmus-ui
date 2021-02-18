import { DateValue, GraphMetric } from "./base";

const data1: DateValue[] = [
  { date: 1000, value: 20 },
  { date: 2000, value: 30 },
  { date: 3000, value: 35 },
  { date: 4000, value: 40 },
  { date: 5000, value: 50 },
  { date: 6000, value: 74 },
  { date: 7000, value: 30 },
  { date: 8000, value: 10 },
];
const data2: DateValue[] = [
  { date: 1000, value: 40 },
  { date: 2000, value: 10 },
  { date: 3000, value: 55 },
  { date: 4000, value: 60 },
  { date: 5000, value: 20 },
  { date: 6000, value: 14 },
  { date: 7000, value: 60 },
  { date: 8000, value: 10 },
];
const data22: DateValue[] = [
  { date: 1000, value: 0 },
  { date: 2000, value: 14 },
  { date: 3000, value: 5 },
  { date: 4000, value: 30 },
  { date: 5000, value: 50 },
  { date: 6000, value: 54 },
  { date: 7000, value: 20 },
  { date: 8000, value: 30 },
];
const data3: DateValue[] = [
  { date: 3000, value: 1 },
  { date: 4000, value: 0 },
  { date: 5000, value: 0 },
  { date: 6000, value: 0 },
  { date: 7000, value: 0 },
];
const data4: DateValue[] = [
  { date: 3000, value: 0 },
  { date: 4000, value: 0 },
  { date: 5000, value: 0 },
  { date: 6000, value: 1 },
  { date: 7000, value: 1 },
  { date: 8000, value: 0 },
  { date: 9000, value: 0 },
];
const seriestest1: Array<GraphMetric> = [
  {
    metricName: "teal",
    data: data1,
    baseColor: "teal",
  },
];
const seriestest2: Array<GraphMetric> = [
  { metricName: "orange", data: data2, baseColor: "orange" },
  { metricName: "pink", data: data22, baseColor: "pink" },
];
const seriestest3: Array<GraphMetric> = [
  {
    metricName:
      "chaos-pod-dele-haos-pod-delehaos-pod-delehaos-pod-delehaos-pod-delehaos-pod-dele",
    data: data3,
    baseColor: "red",
  },
  { metricName: "chaos-network-pod", data: data4, baseColor: "yellow" },
];

export { seriestest1, seriestest2, seriestest3 };
