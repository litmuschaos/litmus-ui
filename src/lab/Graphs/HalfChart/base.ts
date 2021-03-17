export interface RadialChartMetric {
  value: number;
  label: string;
  baseColor?: string;
}

export interface RadialChartProps {
  arcWidth?: number;
  semiCircle?: boolean;
  radialData: RadialChartMetric;
  showCenterHeading?: boolean;
  heading?: string;
  circleExpandOnHover?: number;
  className?: string;
  unit?: string;
  imageSrc?: string;
  imageAlt?: string;
}
export interface RadialChartChildProps extends RadialChartProps {
  width: number;
  height: number;
}
