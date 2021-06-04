import { ParentSize } from "@visx/visx";
import React from "react";
import { GraphMetric, LineAreaGraphProps } from "./base";
import { FilteredStackBar } from "./FilteredStackBar";

const StackBar: React.FC<LineAreaGraphProps<Array<GraphMetric>>> = ({
  legendTableHeight = 100,
  showLegendTable = true,
  ...rest
}) => {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <FilteredStackBar
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

export { StackBar };
