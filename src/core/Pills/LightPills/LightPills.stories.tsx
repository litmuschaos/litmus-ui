import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { LightPills } from "../LightPills";

storiesOf("Pills/Light Pills", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground row>
      <LightPills variant="success" label="Success" />
      <LightPills variant="warning" label="Warning" />
      <LightPills variant="danger" label="Danger" />
    </ThemedBackground>
  ));
