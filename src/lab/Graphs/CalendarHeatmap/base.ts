export interface DateValue {
  // Date in milliseconds
  date: number | string;
  // Value to the corresponding date stamp
  value: number | string;
}
export interface ToolTip<T> {
  // Date stamp and corresponding value
  data: T;
  // Color of the metric in the ToolTip legends
  baseColor?: string;
}
export interface CalendarHeatmapMetric {
  buckets: [{ bins: [{ date: number; [index: string]: any }] }];
}
export type ToolTipDateValue = ToolTip<DateValue>;
export type TooltipData = Array<ToolTipDateValue>;

export interface BinData {
  bin: number;

  count: number;
  [index: string]: any;
}
export interface Bucket {
  bin: number;
  bins: BinData[];
}
