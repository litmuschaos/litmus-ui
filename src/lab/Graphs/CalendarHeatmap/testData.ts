import { Bucket, CalendarHeatmapMetric } from "./base";

const testData: CalendarHeatmapMetric = {
  buckets: [{ bins: [{ date: 1000 }] }],
};

const testData2: Array<Bucket> = [
  {
    bin: 0,
    bins: [
      { bin: 0, count: -1 },
      { bin: 1, count: -1 },
      { bin: 2, count: -1 },
      { bin: 3, count: 10 },
      { bin: 4, count: 15 },
      { bin: 5, count: 25 },
      { bin: 6, count: 40 },
    ],
  },
  {
    bin: 1,
    bins: [
      { bin: 0, count: -1 },
      { bin: 1, count: -1 },
      { bin: 2, count: -1 },
      { bin: 3, count: 10 },
      { bin: 4, count: 15 },
      { bin: 5, count: 25 },
      { bin: 6, count: 40 },
    ],
  },
];
export { testData, testData2 };
