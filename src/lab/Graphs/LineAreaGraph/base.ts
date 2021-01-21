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

export interface LegendData {
  value: Array<string>;
  baseColor?: string;
}
export interface AreaGraphProps {
  closedSeries?: Array<AreaGrapher>;
  openSeries?: Array<AreaGrapher>;
  eventSeries?: Array<AreaGrapher>;
  unit?: string;
  showTips?: boolean;
  showPoints?: boolean;
  showGrid?: boolean;
  showLegend?: true;
  legendTableHeight?: number;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  compact?: boolean;
  yLable?: string;
  yLableOffset?: number;
  xAxistimeFormat?: string;
  toolTiptimeFormat?: string;
}
