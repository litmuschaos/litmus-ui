import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { RadialChart } from "./RadialProgressChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialProgressChart", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <div style={{ height: "10rem", width: "20rem" }}>
      <RadialChart
        radialData={testRadialChartData}
        semiCircle
        heading="Based on test results"
        showCenterHeading
        unit={"%"}
      />
    </div>
  </ThemedBackground>
));
