export interface DataValue {
  date: number | string;
  value: number | string;
}
export interface AreaGrapher {
  metricName: string;
  data: Array<DataValue>;
  baseColor?: string;
}

export interface ToolTipInterface {
  metricName: string;
  data: DataValue;
  baseColor?: string;
}

export interface AreaGraphProps {
  // Area under the curve graph:
  closedSeries?: Array<AreaGrapher>;

  // Line Graph:
  openSeries?: Array<AreaGrapher>;

  // Overlay events with y-height as yMax
  eventSeries?: Array<AreaGrapher>;

  // Y-axis units
  unit?: string;

  // Show Tooltip
  showTips?: boolean;

  // Show individual points of the line and area under the curve graph
  showPoints?: boolean;

  // Grid line for the graph
  showGrid?: boolean;

  // Legend Table below the graph
  showLegend?: true;

  // Legend Table height
  legendTableHeight?: number;

  // Width of the LineAreaGraph
  width?: number;

  // Height of the LineAreaGraph excluding the legendTable
  height?: number;

  // Margins for the LineAreaGraph
  margin?: { top: number; right: number; bottom: number; left: number };

  // Boolean for making the inner margins of the LineAreaGraph compact
  compact?: boolean;

  // Y-axis label
  yLabel?: string;

  // Y-axis label's offset from the axis
  yLableOffset?: number;

  // X-axis ticks format
  xAxistimeFormat?: string;

  // ToolTip date's format
  toolTiptimeFormat?: string;
}
