export interface RadialChartMetric {
  value: number;
  label?: string;
  baseColor?: string;
}

export interface RadialGraphProps {
  // Thickness of the arc in the RadialProgressChart
  arcWidth?: number;

  // A unit string for the type of value being passed
  unit?: string;

  // Boolean for drawing the RadialProgressChart as a cirle or semi-circle
  semiCircle?: boolean;

  // For passing the main heading which appears when the user is
  // not hovering on any specific radial arc
  heading?: string;

  // Optional class for overriding the styles
  className?: string;
}
