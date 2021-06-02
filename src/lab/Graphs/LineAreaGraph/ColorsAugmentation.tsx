import { useTheme } from "@material-ui/core";
import React from "react";
import { GraphMetric, LineAreaGraphChildProps } from "./base";
import { ComputationGraph } from "./ComputationGraph";

const settingAugmentedColors = (
  series: GraphMetric[] | undefined,
  colorArray: string[]
): GraphMetric[] | undefined => {
  let elementColor: string;
  return series?.map((linedata: GraphMetric, index) => {
    elementColor = linedata.baseColor ?? colorArray[index % colorArray.length];
    return {
      metricName: linedata.metricName,
      data: linedata.data,
      baseColor: elementColor,
    };
  });
};

const ColorAugmentation: React.FC<LineAreaGraphChildProps> = ({
  closedSeries,
  openSeries,
  eventSeries,
  ...rest
}) => {
  const { palette } = useTheme();

  const augmentedColorClosedSeries: GraphMetric[] =
    settingAugmentedColors(closedSeries, palette.graph.area) ?? [];
  const augmentedColorOpenSeries: GraphMetric[] =
    settingAugmentedColors(openSeries, palette.graph.line) ?? [];
  const augmentedColorEventSeries: GraphMetric[] =
    settingAugmentedColors(eventSeries, [palette.error.main]) ?? [];

  return (
    <ComputationGraph
      closedSeries={augmentedColorClosedSeries}
      openSeries={augmentedColorOpenSeries}
      eventSeries={augmentedColorEventSeries}
      {...rest}
    />
  );
};

export { ColorAugmentation };
