import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../src/utils/storybook";
import { Tabs } from "./Tabs";

storiesOf("Tabs", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal">
      <Tabs
        value="0"
        onChange={() => {
          console.log(true);
        }}
        label={["Workflow", "Hubs"]}
        content={["Workflow Content", "Hubs Content"]}
      ></Tabs>
    </ThemedBackground>
  ))
  // Wipro IAssure
  .add("Wipro IAssure", () => (
    <ThemedBackground platform="wipro-iAssure">
      <Tabs
        value="0"
        onChange={() => {
          console.log(true);
        }}
        label={["Workflow", "Hubs"]}
        content={["Workflow Content", "Hubs Content"]}
      ></Tabs>
    </ThemedBackground>
  ));
