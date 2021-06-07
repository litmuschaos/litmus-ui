import React from "react";
import { BarStackChildProps } from "./base";
import { PlotStackBar } from "./PlotStackBar";

const FilteredStackBar: React.FC<BarStackChildProps> = ({
  openSeries,
  barSeries,
  height = 200,
  width = 200,
  ...rest
}) => {
  return (
    <PlotStackBar
      height={height}
      width={width}
      openSeries={openSeries}
      barSeries={barSeries}
      {...rest}
    />
  );
};

export { FilteredStackBar };
