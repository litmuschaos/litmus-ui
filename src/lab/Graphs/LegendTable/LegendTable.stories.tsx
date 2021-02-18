import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { LegendTable } from "./LegendTable";
import { LegendTableTestData1 } from "./testData";
storiesOf("Graphs/LegendTable", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal">
    <LegendTable
      data={LegendTableTestData1}
      heading={["Metric Name", "Curr"]}
      width={400}
      height={150}
    />
  </ThemedBackground>
));
