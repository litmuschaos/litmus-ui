import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { ButtonOutlined } from "../ButtonOutlined";

storiesOf("Button/Button Outlined", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground row>
      <ButtonOutlined onClick={() => console.log("clicked")}>
        Button Outlined
      </ButtonOutlined>

      <ButtonOutlined
        variant="highlight"
        onClick={() => console.log("clicked")}
      >
        Button Highlight
      </ButtonOutlined>

      <ButtonOutlined disabled={true} onClick={() => console.log("clicked")}>
        Button Outlined Disabled
      </ButtonOutlined>
    </ThemedBackground>
  ));
