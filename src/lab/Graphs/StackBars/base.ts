export interface BarDateValue {
  // Date in milliseconds
  date: number;
  // Value to the corresponding date stamp
  value: number | string;

  id?: string | undefined;
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
  // Unique id corresponding to every object of StackBarMetric
  id: string;

  // Date in Unix format
  date: number;

  // Pass percentage value between 0-100%
  passPercentage: number;

  // Fail percentage value between 0-100%
  failPercentage: number;

  // Pass count value as any number preferable int
  passCount: number;

  // Fail count value as any number preferable int
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
  // Array of StackBarMetric for the stack bars
  barSeries: Array<StackBarMetric>;

  // Array of LineMetricSeries for the line graph
  openSeries?: LineMetricSeries | undefined;

  // Initial date for the axis
  initialxAxisDate?: number;

  // Margin for the graph
  margin?: { top: number; right: number; bottom: number; left: number };

  // Time format for the x-axis
  xAxistimeFormat?: string;

  // Unit for the y-axis values
  unit?: string;

  // Label for the y-axis
  yLabel?: string;

  // Offset for y-axis label
  yLabelOffset?: number;

  // Handle click function which gives user barData
  handleBarClick?: (barData: any) => void;

  // Tooltip React element for custom tooltip
  StackBarTooltip?: ({
    tooltipData,
  }: StackBarTooltipProps) => React.ReactElement;
}
export interface BarStackChildProps extends BarStackProps {
  // Width of the parent
  width: number;

  // Height of the parent
  height: number;
}
export type ToolTipDateValue = ToolTip<BarDateValue>;
export type TooltipData = Array<ToolTipDateValue>;
