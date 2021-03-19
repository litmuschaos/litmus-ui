import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../../utils/storybook";
import { RadialChart } from "./RadialChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialGraphs/RadialChart", module).add(
  "Litmus Portal",
  () => (
    <ThemedBackground>
      <div style={{ height: "15rem", width: "30rem" }}>
        {/* For aligning the LegendTable right an aspect 
        ratio of 1:2 , height:width is most suitable */}
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
  )
);
