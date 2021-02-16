import { useTheme } from "@material-ui/core/styles";
import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../utils/storybook";
import { ProgressBar } from "./ProgressBar";

storiesOf("ProgressBar", module)
  // Litmus Portal

  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal">
      <ProgressBar
        value={80}
        label="Success"
        color={useTheme().palette.success.main}
      />
    </ThemedBackground>
  ));
