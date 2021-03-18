import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { RadialChart } from "./PassFailBar";
import { testRadialChartData } from "./testData";

storiesOf("Graphs/PassFailBar", module).add("Litmus Portal", () => (
  <ThemedBackground>
    <div style={{ height: "2rem", width: "15rem" }}>
      <RadialChart radialData={testRadialChartData} />
    </div>
  </ThemedBackground>
));
