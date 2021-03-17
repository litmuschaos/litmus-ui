export interface RadialChartMetric {
  value: number;
  label: string;
  baseColor?: string;
}
export type LegendTableOrientation = "bottom" | "right" | undefined;

export interface RadialChartProps {
  legendTableHeight?: number;
  arcWidth?: number;
  events?: boolean;
  showOuterArc?: boolean;
  semiCircle?: boolean;
  showLegend?: boolean;
  radialData: RadialChartMetric[];
  showCenterHeading?: boolean;
  heading?: string;
  circleExpandOnHover?: number;
  alignLegendTable?: LegendTableOrientation;
  className?: string;
}
export interface RadialChartChildProps extends RadialChartProps {
  width: number;
  height: number;
}
