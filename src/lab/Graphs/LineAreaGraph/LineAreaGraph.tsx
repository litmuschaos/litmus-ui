import { useTheme } from "@material-ui/core";
import { ParentSize } from "@visx/visx";
import React from "react";
import {
  GraphMetric,
  LineAreaGraphProps,
  StrictColorGraphMetric,
} from "./base";
import { FilteredLineAreaGraph } from "./FilteredLineAreaGraph";

const settingAugmentedColors = (
  series: GraphMetric[] | undefined,
  colorArray: string[]
): StrictColorGraphMetric[] | undefined => {
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

const LineAreaGraph: React.FC<LineAreaGraphProps<Array<GraphMetric>>> = ({
  legendTableHeight = 100,
  showLegendTable = true,
  closedSeries,
  openSeries,
  eventSeries,
  ...rest
}) => {
  const { palette } = useTheme();

  const augmentedColorClosedSeries: StrictColorGraphMetric[] =
    settingAugmentedColors(closedSeries, palette.graph.area) ?? [];
  const augmentedColorOpenSeries: StrictColorGraphMetric[] =
    settingAugmentedColors(openSeries, palette.graph.line) ?? [];
  const augmentedColorEventSeries: StrictColorGraphMetric[] =
    settingAugmentedColors(eventSeries, [palette.error.main]) ?? [];
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <FilteredLineAreaGraph
            closedSeries={augmentedColorClosedSeries}
            openSeries={augmentedColorOpenSeries}
            eventSeries={augmentedColorEventSeries}
            height={height}
            showLegendTable={showLegendTable}
            legendTableHeight={legendTableHeight}
            width={width}
            {...rest}
          />
        )
      }
    </ParentSize>
  );
};

export { LineAreaGraph };
