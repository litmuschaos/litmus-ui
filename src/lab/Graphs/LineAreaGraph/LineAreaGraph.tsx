import { ParentSize } from "@visx/visx";
import React from "react";
import { GraphMetric, LineAreaGraphProps } from "./base";
import { FilteredLineAreaGraph } from "./FilteredLineAreaGraph";

const LineAreaGraph: React.FC<LineAreaGraphProps<Array<GraphMetric>>> = ({
  legendTableHeight = 100,
  showLegendTable = true,
  ...rest
}) => {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <FilteredLineAreaGraph
            height={height - (showLegendTable ? legendTableHeight : 0)}
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
