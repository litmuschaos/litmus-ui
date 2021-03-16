import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { HalfChart } from "./HalfChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/HalfChart", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <div style={{ height: "20rem", width: "20rem" }}>
      <HalfChart
        radialData={testRadialChartData}
        semiCircle={false}
        heading="heading"
        legendTableHeight={100}
      />
    </div>
  </ThemedBackground>
));
