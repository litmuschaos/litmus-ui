import { RadialChartMetric } from "../base";

export type LegendTableOrientation = "bottom" | "right" | undefined;

export interface RadialChartProps {
  legendTableHeight?: number;
  arcWidth?: number;
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
