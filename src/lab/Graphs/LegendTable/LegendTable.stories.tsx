import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { LegendTable } from "./LegendTable";
import { LegendTableTestData1 } from "./testData";
storiesOf("Graphs/LegendTable", module).add("Litmus Portal", () => (
  <ThemedBackground>
    <div
      style={{
        width: "30rem",
        height: "10rem",
      }}
    >
      <LegendTable
        data={LegendTableTestData1}
        heading={["Metric Name", "Curr"]}
      />
    </div>
  </ThemedBackground>
));
