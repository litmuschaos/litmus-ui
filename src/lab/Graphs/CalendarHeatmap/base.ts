export interface DateValue {
  [index: string]: any;
}
export interface ToolTip<T> {
  // Date stamp and corresponding value
  data: T;
  // Color of the metric in the ToolTip legends
}

export type ToolTipDateValue = ToolTip<DateValue>;
export type TooltipData = ToolTipDateValue;

export interface DayData {
  value: number;
  [index: string]: any;
}
export interface WeekData {
  bins: DayData[]; // 7 day
}
