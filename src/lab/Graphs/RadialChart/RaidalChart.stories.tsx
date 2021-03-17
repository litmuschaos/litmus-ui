import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { RadialChart } from "./RadialChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialChart", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <div style={{ height: "20rem", width: "30rem" }}>
      <RadialChart
        radialData={testRadialChartData}
        semiCircle={false}
        heading="heading"
        legendTableHeight={100}
        alignLegendTable={"right"}
        showCenterHeading
      />
    </div>
  </ThemedBackground>
));
