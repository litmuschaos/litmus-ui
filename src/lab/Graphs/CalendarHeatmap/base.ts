export interface GenericValue {
  // Generic structure
  [index: string]: any;
}
export interface ToolTip<T> {
  // Generic data for Tooltip
  data: T;
}

export type ToolTipDateValue = ToolTip<GenericValue>;
export type TooltipData = ToolTipDateValue;

export interface DayData {
  // Value is the variable used for the internal calculation
  // of the colors
  value: number;

  // Other data that belongs to the structure
  [index: string]: any;
}
export interface WeekData {
  // Bins corresonds to the bin of 7 days combined
  bins: DayData[];
}
