import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../../utils/storybook";
import { RadialProgressChart } from "./RadialProgressChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialGraphs/RadialProgressChart", module).add(
  "Litmus Portal",
  () => (
    <ThemedBackground>
      <div style={{ height: "10rem", width: "20rem" }}>
        {/* Parent with height:width of around 1:2 is most suitable for 
        semiCirle */}
        <RadialProgressChart
          radialData={testRadialChartData}
          iconSize={"2rem"}
          semiCircle
          heading="Based on test results"
          unit={"%"}
        />
      </div>
    </ThemedBackground>
  )
);
