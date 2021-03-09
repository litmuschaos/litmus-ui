import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { LegendTable } from "./LegendTable";
import { LegendTableTestData1 } from "./testData";
storiesOf("Graphs/LegendTable", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal">
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
  ))
  // Wipro IAssure
  .add("Wipro IAssure", () => (
    <ThemedBackground platform="wipro-iAssure">
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
