import React, { useState } from "react";
import { LineAreaGraph } from "../LineAreaGraph";
import { BrushPostitionProps } from "./base";
import { closedSeriesData, eventSeriesData, openSeriesData } from "./testData";

const MultipleGraphs = () => {
  const [centralBrushPosition, setCentralBrushPosition] =
    useState<BrushPostitionProps>();
  const [centralAllowGraphUpdate, setCentralAllowGraphUpdate] =
    useState<boolean>(true);
  // console.log("brushPosition Stae", centralBrushPosition);
  return (
    <div>
      <div style={{ width: "30rem", height: "18rem" }}>
        <LineAreaGraph
          centralBrushPosition={centralBrushPosition}
          handleCentralBrushPosition={(newBrushPosition: BrushPostitionProps) =>
            setCentralBrushPosition(newBrushPosition)
          }
          centralAllowGraphUpdate={centralAllowGraphUpdate}
          handleCentralAllowGraphUpdate={(value: boolean) =>
            setCentralAllowGraphUpdate(value)
          }
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
        />
      </div>
      <div style={{ width: "30rem", height: "18rem", marginTop: "4rem" }}>
        <LineAreaGraph
          centralBrushPosition={centralBrushPosition}
          handleCentralBrushPosition={(newBrushPosition: BrushPostitionProps) =>
            setCentralBrushPosition(newBrushPosition)
          }
          centralAllowGraphUpdate={centralAllowGraphUpdate}
          handleCentralAllowGraphUpdate={(value: boolean) =>
            setCentralAllowGraphUpdate(value)
          }
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
        />
      </div>
    </div>
  );
};
export { MultipleGraphs };
