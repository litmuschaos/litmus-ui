import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { Pills } from "../BasicPills";

storiesOf("Pills/Basic Pills", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal">
      <Pills variant="default" label="Basic Pill" />
    </ThemedBackground>
  ))
  // Wipro IAssure
  .add("Wipro IAssure", () => (
    <ThemedBackground platform="wipro-iAssure">
      <Pills variant="default" label="Basic Pill" />
    </ThemedBackground>
  ));
