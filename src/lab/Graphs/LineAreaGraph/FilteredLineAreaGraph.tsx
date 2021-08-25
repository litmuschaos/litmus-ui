import React from "react";
import { LineAreaGraphChildProps, StrictColorGraphMetric } from "./base";
import { ComputationGraph } from "./ComputationGraph";

// filterUndefinedData performs type checking and filter undefined data
// TODO optimization for the case when Backend api is sure of data integrity
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
  // Filter undefined data from eventSeries
  let augmentEventSeries: Array<StrictColorGraphMetric> | undefined =
    filterUndefinedData(eventSeries);

  // The start and end for every individual event in the event series
  // is assigned based on the change of value from 1 to 0 or 1 to 0.
  // Also for the points where is event is happening (value=1)
  // augementEventSeries value is set as True. For data points
  // where event is not happening (value =0), augmentEventSeries value
  // is set as False
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

  // Filter closedSeries
  const augmentClosedSeries: Array<StrictColorGraphMetric> =
    filterUndefinedData(closedSeries) ?? [];

  // Filter openSeries
  const augmentOpenSeries: Array<StrictColorGraphMetric> =
    filterUndefinedData(openSeries) ?? [];
  return (
    // Passing all props as set by user and all augmented Series to
    // ComputationGarph component
    <ComputationGraph
      closedSeries={augmentClosedSeries}
      openSeries={augmentOpenSeries}
      eventSeries={augmentEventSeries}
      {...rest}
    />
  );
};

export { FilteredLineAreaGraph };
