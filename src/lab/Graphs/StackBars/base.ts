export interface BarDateValue {
  // Date in milliseconds
  date: number | string;
  // Value to the corresponding date stamp
  value: number | string;

  runId?: string | undefined;
}
export interface LineMetricSeries {
  // Name of the GraphMetric
  metricName: string;

  // Array of {date and value}
  data: Array<BarDateValue>;

  // Color of the metric in the graph and legends
  baseColor?: string;
}

export interface StackBarMetric {
  runId: string;
  date: number;
  passPercentage: string;
  failPercentage: string;
  passCount: number;
  failCount: number;
}
export interface ToolTip<T> {
  // Name of the metric
  metricName: string;

  // Date stamp and corresponding value
  data: T;
  // Color of the metric in the ToolTip legends
  baseColor?: string;
}

export type StackBarTooltipProps = {
  // Used for the tooltip to receive Tooltip data for the contruction of tooltip UI
  tooltipData: TooltipData;
};
export interface BarStackProps {
  barSeries: Array<StackBarMetric>;
  openSeries?: LineMetricSeries | undefined;
  initalxAxisDate: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxistimeFormat?: string;
  unit?: string;
  yLabel?: string;
  yLabelOffset?: number;
  handleBarClick?: (barData: any) => void;
  StackBarTooltip?: ({
    tooltipData,
  }: StackBarTooltipProps) => React.ReactElement;
}
export interface BarStackChildProps extends BarStackProps {
  width: number;
  height: number;
}
export type ToolTipDateValue = ToolTip<BarDateValue>;
export type TooltipData = Array<ToolTipDateValue>;
