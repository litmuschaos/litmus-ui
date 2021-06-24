import React, { useState } from "react";
import { LineAreaGraph } from "../LineAreaGraph";
import { closedSeriesData, eventSeriesData, openSeriesData } from "./testData";

interface CentralBrushPostitionProps {
  start: { x: number | undefined };
  end: { x: number | undefined };
}

const MultipleGraphs = () => {
  const [centralBrushPosition, setCentralBrushPosition] =
    useState<CentralBrushPostitionProps>();
  // console.log("brushPosition Stae", centralBrushPosition);
  return (
    <div>
      <div style={{ width: "30rem", height: "18rem" }}>
        <LineAreaGraph
          centralBrushPosition={centralBrushPosition}
          handleCentralBrushPosition={(
            newBrushPosition: CentralBrushPostitionProps
          ) => setCentralBrushPosition(newBrushPosition)}
          legendTableHeight={120}
          closedSeries={closedSeriesData}
          openSeries={openSeriesData}
          eventSeries={eventSeriesData}
          showEventTable={true}
          showMultiToolTip={true}
          showPoints={true}
          showLegendTable={false}
          showTips={true}
          unit="%"
          yLabel="Chaos"
          yLabelOffset={35}
          marginLeftEventTable={10}
          widthPercentageEventTable={40}
          showRangeSlider={true}
        />
      </div>
      <div style={{ width: "30rem", height: "18rem", marginTop: "4rem" }}>
        <LineAreaGraph
          centralBrushPosition={centralBrushPosition}
          handleCentralBrushPosition={(
            newBrushPosition: CentralBrushPostitionProps
          ) => setCentralBrushPosition(newBrushPosition)}
          legendTableHeight={120}
          closedSeries={closedSeriesData}
          openSeries={openSeriesData}
          eventSeries={eventSeriesData}
          showEventTable={true}
          showMultiToolTip={true}
          showPoints={true}
          showLegendTable={false}
          showTips={true}
          showRangeSlider={true}
          unit="%"
          yLabel="Chaos"
          yLabelOffset={35}
          marginLeftEventTable={10}
          widthPercentageEventTable={40}
        />
      </div>
    </div>
  );
};
export { MultipleGraphs };
