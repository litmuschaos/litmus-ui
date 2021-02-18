import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { LineAreaGraph } from "./LineAreaGraph";
import { seriestest1, seriestest2, seriestest3 } from "./testData";
storiesOf("Graphs/Area", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <LineAreaGraph
      width={600}
      height={400}
      legendTableHeight={150}
      closedSeries={seriestest1}
      openSeries={seriestest2}
      eventSeries={seriestest3}
      showPoints
      showTips
      unit="%"
      yLabel="Chaos"
    />
  </ThemedBackground>
));
