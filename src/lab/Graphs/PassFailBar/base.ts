export interface RadialChartMetric {
  value: number;
  label: string;
  baseColor?: string;
}

export interface RadialChartProps {
  barWidth?: number;
  radialData: RadialChartMetric;
  className?: string;
}
export interface RadialChartChildProps extends RadialChartProps {
  width: number;
  height: number;
}
