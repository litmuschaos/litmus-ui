import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../src/utils/storybook";
import { Tabs } from "./Tabs";

storiesOf("Tabs", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground>
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
