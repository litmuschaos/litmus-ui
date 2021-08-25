import { useTheme } from "@material-ui/core";
import { ParentSize } from "@visx/visx";
import React from "react";
import {
  GraphMetric,
  LineAreaGraphProps,
  StrictColorGraphMetric,
} from "./base";
import { FilteredLineAreaGraph } from "./FilteredLineAreaGraph";

// settingAugmentedColors function checks whether each metric has been
// passed with colors or not
// if no color is assigned to the metric then it iterates
// over a colorArray and assigns colors to each metric
const settingAugmentedColors = (
  series: GraphMetric[] | undefined,
  colorArray: string[]
): StrictColorGraphMetric[] | undefined => {
  let elementColor: string;
  return series?.map((linedata: GraphMetric, index) => {
    // Set elementColor to the color which has been passed by the user
    // if user hasn't assigned any color, then it baseColor for that metric
    // will be undefined and thus a color from the array is assigned to it
    elementColor = linedata.baseColor ?? colorArray[index % colorArray.length];
    return {
      metricName: linedata.metricName,
      data: linedata.data,
      baseColor: elementColor,
      subData: linedata.subData,
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

  // Set colors for closedSeries metric
  const augmentedColorClosedSeries: StrictColorGraphMetric[] =
    settingAugmentedColors(closedSeries, palette.graph.area) ?? [];

  // Set colors for openSeries metric
  const augmentedColorOpenSeries: StrictColorGraphMetric[] =
    settingAugmentedColors(openSeries, palette.graph.line) ?? [];

  // Set colors for eventSeries metric
  const augmentedColorEventSeries: StrictColorGraphMetric[] =
    settingAugmentedColors(eventSeries, [palette.error.main]) ?? [];
  return (
    // ParentSize calculates the (width,height) of the parent and passes
    // it to the FilteredLineAreaGraph along with other props
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
