import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { RadialChart } from "./RadialChart";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/RadialChart", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <RadialChart
      width={300}
      height={300}
      radialData={testRadialChartData}
      circleExpandOnHover={4}
      heading={"Workflows"}
    />
  </ThemedBackground>
));
