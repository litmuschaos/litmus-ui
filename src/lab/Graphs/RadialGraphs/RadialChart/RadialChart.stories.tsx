import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../../utils/storybook";
import { RadialChart } from "./RadialChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialGraphs/RadialChart", module).add(
  "Litmus Portal",
  () => (
    <ThemedBackground>
      <div style={{ height: "12rem", width: "30rem" }}>
        <RadialChart
          radialData={testRadialChartData}
          semiCircle
          heading="heading"
          legendTableHeight={100}
          alignLegendTable={"right"}
          showCenterHeading
        />
      </div>
    </ThemedBackground>
  )
);
