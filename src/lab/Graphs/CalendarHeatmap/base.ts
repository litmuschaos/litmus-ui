export interface GenericValue {
  [index: string]: any;
}
export interface ToolTip<T> {
  data: T;
}

export type ToolTipDateValue = ToolTip<GenericValue>;
export type TooltipData = ToolTipDateValue;

export interface DayData {
  value: number;
  [index: string]: any;
}
export interface WeekData {
  bins: DayData[];
}
