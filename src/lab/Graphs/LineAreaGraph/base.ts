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

  // Sub-data describing the specific event
  subData?:
    | Array<{ subDataName: string; value: string; date: number }>
    | undefined;

  // Color of the metric in the graph and legends
  baseColor?: string;
}
export interface StrictColorGraphMetric extends Omit<GraphMetric, "baseColor"> {
  // Color of the metric in the graph and legends
  baseColor: string;
}

export interface ToolTip<T> {
  // Name of the metric
  metricName: string;

  // Date stamp and corresponding value
  data: T;
  // Color of the metric in the ToolTip legends
  baseColor: string;
}
export interface BrushPostitionProps {
  start: { x: number | undefined };
  end: { x: number | undefined };
}

export interface StrictBrushPostitionProps {
  start: { x: number };
  end: { x: number };
}

export interface LineAreaGraphProps<T> {
  // Area under the curve graph:
  closedSeries?: T;

  // Line Graph:
  openSeries?: T;

  // Overlay events with y-height as yMax
  eventSeries?: T;

  // Y-axis units
  unit?: string;

  // Show Tooltip
  showTips?: boolean;

  // Show multiToolTip, when true it shows all the data
  // points along the Y-axix for the dateStamp where mouse is hovering
  showMultiToolTip?: boolean;

  // Show individual points of the line and area under the curve graph
  showPoints?: boolean;

  // Show the individual start and end markers for the event series
  showEventMarkers?: boolean;

  // Grid line for the graph
  showGrid?: boolean;

  // Legend Table below the graph
  showLegendTable?: boolean;

  // Event Table for the Event Series and its sub-data
  showEventTable?: boolean;

  // RangeSlider for selecting the data from the given internal
  showRangeSlider?: boolean;

  // Range Slider height
  rangeSliderHeight?: number;

  // Legend Table height
  legendTableHeight?: number;

  // Width percentage of the Event Table when both Legend Table and Event Table are
  // aligned side by side
  widthPercentageEventTable?: number;

  // Margin left of Event Table i.e. gap between Event Table and Legend Table
  marginLeftEventTable?: number;

  // Margins for the LineAreaGraph
  margin?: { top: number; right: number; bottom: number; left: number };

  // Boolean to hide or show the x-axis
  //TODO replace compact with the much verbose prop hideBottomAxis
  // and hideLeftAxis
  compact?: boolean;

  // Y-axis label
  yLabel?: string;

  // Y-axis label's offset from the axis
  yLabelOffset?: number;

  // X-axis ticks format
  xAxistimeFormat?: string;

  // ToolTip date's format
  toolTiptimeFormat?: string;

  // central variable which contains the state
  // of the brush positoins to be used by all the graphs
  centralBrushPosition?: BrushPostitionProps;

  // function for updating the state of the centralBushPosition
  // upon the update of the localBrushPositions
  handleCentralBrushPosition?: (newBrushPosition: BrushPostitionProps) => void;

  //  State variable to allow/block data update of the Graph
  // espically for realtime data
  centralAllowGraphUpdate?: boolean;

  // Handle function for setting the centralAllowGraphUpdate
  handleCentralAllowGraphUpdate?: (value: boolean) => void;
}
export interface LineAreaGraphChildProps
  extends LineAreaGraphProps<Array<StrictColorGraphMetric>> {
  // Width of the LineAreaGraph
  width?: number;

  // Height of the LineAreaGraph excluding the legendTable
  height?: number;
}

// ToolTipDateValue interface is the of type ToolTip with data as type DateValue
export type ToolTipDateValue = ToolTip<DateValue>;

// TooltipData is the array of ToolTipDateValue
export type TooltipData = Array<ToolTipDateValue>;
