export interface GenericValue {
  // Generic structure
  [index: string]: any;
}
export interface ToolTip<T> {
  // Generic data for Tooltip
  data: T;
}

export type ToolTipValue = ToolTip<GenericValue>;

export interface DayData {
  // Value is the variable used for the internal calculation
  // of the colors
  value: number | undefined;

  // Other data that belongs to the structure
  [index: string]: any;
}
export interface WeekData {
  // Bins corresonds to bin of the days combined
  bins: DayData[];
}

export type CalendarHeatmapTooltipProps = {
  // Used for the tooltip to receive Tooltip data for the contruction of tooltip UI
  tooltipData: ToolTipValue;
};

export type CalendarHeatMap = {
  // Width of one node/bin
  binWidth?: number;

  // Height of one node/bin
  binHeight?: number;

  // Metric for the calendarHeatmap component
  // where the data is the array of WeekData and each element in the
  // WeekData corresponds to a day
  calendarHeatmapMetric: Array<WeekData>;

  // Margin for the graph grid
  margin?: { top: number; right: number; bottom: number; left: number };

  // Array of breakpoints for the color change
  valueThreshold: Array<number>;

  // Array of colors for the value of the data corresponding to the
  // breakpoints
  colorMap?: Array<string>;

  // Function for handling the click event on the single node/bin/rect
  handleBinClick?: (bin: any) => void;

  // For the setting up the data to be shown in the tooltip
  CalendarHeatmapTooltip: ({
    tooltipData,
  }: CalendarHeatmapTooltipProps) => React.ReactElement;
};

export interface CalendarHeatMapChildProps extends CalendarHeatMap {
  // Width of the parent
  width?: number;

  // Height of the parent
  height?: number;
}
