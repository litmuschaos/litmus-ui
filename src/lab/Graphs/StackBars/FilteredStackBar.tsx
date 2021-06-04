import React from "react";
import { GraphMetric, LineAreaGraphChildProps } from "./base";
import { PlotStackBar } from "./PlotStackBar";

// filterUndefinedData performs type checking and
const filterUndefinedData = (
  data: GraphMetric[] | undefined
): GraphMetric[] | undefined =>
  data
    ? data
        .filter((elem) => elem && elem.data && elem.data.length)
        .filter((elem) =>
          elem.data.filter(
            (d) =>
              d &&
              d.date &&
              (typeof d.date === "number" || typeof d.date === "string") &&
              (typeof d.value === "number" || typeof d.value === "string")
          )
        )
    : data;
const filterUndefinedBarData = (
  data: GraphMetric[] | undefined
): GraphMetric[] | undefined =>
  data
    ? data
        .filter((elem) => elem && elem.data && elem.data.length)
        .filter((elem) =>
          elem.data.filter(
            (d) =>
              d &&
              d.date &&
              (typeof d.date === "number" || typeof d.date === "string") &&
              (typeof d.value === "number" || typeof d.value === "string")
          )
        )
    : data;
const FilteredStackBar: React.FC<LineAreaGraphChildProps> = ({
  openSeries,
  barSeries,
  height = 200,
  width = 200,
  ...rest
}) => {
  const augmentOpenSeries: Array<GraphMetric> =
    filterUndefinedData(openSeries) ?? [];
  const augmentBarSeries: Array<GraphMetric> =
    filterUndefinedBarData(barSeries) ?? [];
  return (
    <div>
      <PlotStackBar height={height} width={width} />
    </div>
  );
};

export { FilteredStackBar };
