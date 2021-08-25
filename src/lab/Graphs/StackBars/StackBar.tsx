import { ParentSize } from "@visx/visx";
import React from "react";
import { BarStackProps } from "./base";
import { FilteredStackBar } from "./FilteredStackBar";

const StackBar: React.FC<BarStackProps> = ({ ...rest }) => {
  //  ParentSize calculates the (width,height) of the parent and passes
  //  it to the FilteredStackBar along with other props
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
