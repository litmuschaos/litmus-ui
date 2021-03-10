export interface DateValue {
  // Date in milliseconds
  date: number | string;
  // Value to the corresponding date stamp
  value: number | string;
}
export interface GraphMetric {
  // Name of the GraphMetric
  metricName: string;

  // Array of {date and value}
  data: Array<DateValue>;

  // Color of the metric in the graph and legends
  baseColor?: string;
}

export interface ToolTipInterface {
  // Name of the metric
  metricName: string;

  // Date stamp and corresponding value
  data: DateValue;
  // Color of the metric in the ToolTip legends
  baseColor?: string;
}

export interface LineAreaGraphProps {
  // Area under the curve graph:
  closedSeries?: Array<GraphMetric>;

  // Line Graph:
  openSeries?: Array<GraphMetric>;

  // Overlay events with y-height as yMax
  eventSeries?: Array<GraphMetric>;

  // Y-axis units
  unit?: string;

  // Show Tooltip
  showTips?: boolean;

  // Show individual points of the line and area under the curve graph
  showPoints?: boolean;

  // Show the individual start and end markers for the event series
  showEventMarkers?: boolean;

  // Grid line for the graph
  showGrid?: boolean;

  // Legend Table below the graph
  showLegendTable?: boolean;

  // Legend Table height
  legendTableHeight?: number;

  // Margins for the LineAreaGraph
  margin?: { top: number; right: number; bottom: number; left: number };

  // Boolean for making the inner margins of the LineAreaGraph compact
  compact?: boolean;

  // Y-axis label
  yLabel?: string;

  // Y-axis label's offset from the axis
  yLabelOffset?: number;

  // X-axis ticks format
  xAxistimeFormat?: string;

  // ToolTip date's format
  toolTiptimeFormat?: string;
}
export interface GraphProps extends LineAreaGraphProps {
  // Width of the LineAreaGraph
  width?: number;

  // Height of the LineAreaGraph excluding the legendTable
  height?: number;
}
