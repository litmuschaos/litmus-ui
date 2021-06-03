import React from "react";
import { GraphMetric, LineAreaGraphChildProps } from "./base";
import { Example } from "./PlotLineAreaGraphBar";

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

const FilteredLineAreaGraph: React.FC<LineAreaGraphChildProps> = ({
  compact = false,
  openSeries,
  height = 200,
  margin = {
    top: 20,
    left: 100,
    bottom: 20,
    right: 20,
  },
  ...rest
}) => {
  const augmentOpenSeries: Array<GraphMetric> =
    filterUndefinedData(openSeries) ?? [];
  return (
    <div>
      <Example height={height} width={400} />
    </div>
  );
};

export { FilteredLineAreaGraph };
