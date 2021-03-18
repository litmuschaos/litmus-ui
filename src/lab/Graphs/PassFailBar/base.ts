export interface RadialChartMetric {
  value: number;
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
