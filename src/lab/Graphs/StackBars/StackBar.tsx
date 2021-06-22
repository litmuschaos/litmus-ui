import { ParentSize } from "@visx/visx";
import React from "react";
import { BarStackProps } from "./base";
import { FilteredStackBar } from "./FilteredStackBar";

const StackBar: React.FC<BarStackProps> = ({ ...rest }) => {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <FilteredStackBar height={height} width={width} {...rest} />
        )
      }
    </ParentSize>
  );
};

export { StackBar };
