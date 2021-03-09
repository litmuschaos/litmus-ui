import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { RadialChart } from "./RadialChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialChart", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal">
      <div style={{ height: "20rem", width: "20rem" }}>
        <RadialChart
          radialData={testRadialChartData}
          semiCircle={false}
          heading="heading"
          legendTableHeight={100}
        />
      </div>
    </ThemedBackground>
  ))
  // Wipro IAssure
  .add("Wipro IAssure", () => (
    <ThemedBackground platform="wipro-iAssure">
      <div style={{ height: "20rem", width: "20rem" }}>
        <RadialChart
          radialData={testRadialChartData}
          semiCircle={false}
          heading="heading"
          legendTableHeight={100}
        />
      </div>
    </ThemedBackground>
  ));
