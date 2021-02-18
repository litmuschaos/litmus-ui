export interface RadialChartMetric {
  value: number;
  label: string;
  baseColor?: string;
}
export interface RadialChartProps {
  legendTableHeight?: number;
  centerSize?: number;
  events?: boolean;
  showOuterArc?: boolean;
  semiCircle?: boolean;
  showLegend?: boolean;
  radialData: RadialChartMetric[];
  heading?: string;
  circleExpandOnHover?: number;
}
export interface RadialChartChildProps extends RadialChartProps {
  width: number;
  height: number;
}
