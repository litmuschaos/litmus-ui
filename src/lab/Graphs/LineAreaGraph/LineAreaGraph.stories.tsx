import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { LineAreaGraph } from "./LineAreaGraph";
import { seriestest1, seriestest2, seriestest3 } from "./testData";
storiesOf("Graphs/Area", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <div
      style={{
        width: "30rem",
        height: "25rem",
      }}
    >
      <LineAreaGraph
        legendTableHeight={80}
        closedSeries={seriestest1}
        openSeries={seriestest2}
        eventSeries={seriestest3}
        showPoints
        showLegendTable
        showTips
        unit="%"
        yLabel="Chaos"
        yLabelOffset={30}
        margin={{ left: 50, right: 20, top: 20, bottom: 10 }}
      />
    </div>
  </ThemedBackground>
));
