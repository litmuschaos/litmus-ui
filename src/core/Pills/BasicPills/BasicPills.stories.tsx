import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { Pills } from "../BasicPills";

storiesOf("Pills/Basic Pills", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground>
      <Pills variant="default" label="Basic Pill" />
    </ThemedBackground>
  ));
