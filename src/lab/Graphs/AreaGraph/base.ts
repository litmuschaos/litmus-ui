export interface DataValue {
  date: number;
  value: number;
}

export interface AreaGrapher {
  metricName: string;
  data: Array<DataValue>;
}
