import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../../utils/storybook";
import { RadialProgressChart } from "./RadialProgressChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialGraphs/RadialProgressChart", module).add(
  "Litmus Portal",
  () => (
    <ThemedBackground>
      <div style={{ height: "30rem", width: "30rem" }}>
        <RadialProgressChart
          radialData={testRadialChartData}
          iconSize={"4rem"}
          semiCircle
          heading="Based on test results"
          unit={"%"}
        />
      </div>
    </ThemedBackground>
  )
);
