import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { RadialChart } from "./RadialChart";
import { testRadialChartData } from "./testRadialChartData";

storiesOf("Graphs/RadialChart", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <RadialChart
      width={500}
      height={250}
      radialData={testRadialChartData}
      semiCircle
    />
  </ThemedBackground>
));
