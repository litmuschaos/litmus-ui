import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { LineAreaGraph } from "./LineAreaGraph";
import { closedSeriesData, eventSeriesData, openSeriesData } from "./testData";

storiesOf("Graphs/Area", module).add("Litmus Portal", () => (
  <ThemedBackground>
    <div
      style={{
        width: "60rem",
        height: "25rem",
      }}
    >
      <LineAreaGraph
        legendTableHeight={150}
        closedSeries={closedSeriesData}
        openSeries={openSeriesData}
        eventSeries={eventSeriesData}
        showEventTable
        showPoints
        showLegendTable
        showEventMarkers
        showTips
        marginLeftEventTable={10}
        unit="%"
        yLabel="Chaos"
        yLabelOffset={30}
        margin={{ left: 50, right: 20, top: 20, bottom: 10 }}
      />
    </div>
  </ThemedBackground>
));
