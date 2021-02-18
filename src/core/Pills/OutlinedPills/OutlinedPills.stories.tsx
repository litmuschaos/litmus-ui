import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { OutlinedPills } from "../../Pills";

storiesOf("Pills/Outlined Pills", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal">
      <OutlinedPills label="Outlined Pill" />
    </ThemedBackground>
  ));
