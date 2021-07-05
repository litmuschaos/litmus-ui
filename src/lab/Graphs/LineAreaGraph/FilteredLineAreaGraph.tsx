import React from "react";
import { LineAreaGraphChildProps, StrictColorGraphMetric } from "./base";
import { ComputationGraph } from "./ComputationGraph";

// filterUndefinedData performs type checking and
const filterUndefinedData = (
  data: StrictColorGraphMetric[] | undefined
): StrictColorGraphMetric[] | undefined =>
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
  closedSeries,
  openSeries,
  eventSeries,
  ...rest
}) => {
  let augmentEventSeries: Array<StrictColorGraphMetric> | undefined =
    filterUndefinedData(eventSeries);

  if (augmentEventSeries) {
    for (let i = 0; i < augmentEventSeries.length; i++) {
      for (let j = 0; j < augmentEventSeries[i].data.length; j++) {
        if (
          augmentEventSeries[i].data[j].value === 1 &&
          (j - 1 < 0 ||
            (j - 1 >= 0 && augmentEventSeries[i].data[j - 1].value === "False"))
        ) {
          augmentEventSeries[i].data[j].value = "Start";
        } else if (
          augmentEventSeries[i].data[j].value === 0 &&
          j - 1 >= 0 &&
          (augmentEventSeries[i].data[j - 1].value === "True" ||
            augmentEventSeries[i].data[j - 1].value === "Start")
        ) {
          augmentEventSeries[i].data[j].value = "End";
        } else if (augmentEventSeries[i].data[j].value === 0) {
          augmentEventSeries[i].data[j].value = "False";
        } else if (augmentEventSeries[i].data[j].value === 1) {
          augmentEventSeries[i].data[j].value = "True";
        }
      }
    }
  }
  augmentEventSeries = augmentEventSeries ?? [];
  const augmentClosedSeries: Array<StrictColorGraphMetric> =
    filterUndefinedData(closedSeries) ?? [];

  const augmentOpenSeries: Array<StrictColorGraphMetric> =
    filterUndefinedData(openSeries) ?? [];
  return (
    <ComputationGraph
      closedSeries={augmentClosedSeries}
      openSeries={augmentOpenSeries}
      eventSeries={augmentEventSeries}
      {...rest}
    />
  );
};

export { FilteredLineAreaGraph };
