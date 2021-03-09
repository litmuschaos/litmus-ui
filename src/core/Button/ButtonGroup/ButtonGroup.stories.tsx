import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { ButtonGroup } from "./ButtonGroup";

storiesOf("Button/ButtonGroup", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal" row>
      <ButtonGroup variant="default" />
      <ButtonGroup variant="success" />
      <ButtonGroup variant="error" />
    </ThemedBackground>
  ))
  // Wipro IAssure
  .add("Wipro IAssure", () => (
    <ThemedBackground platform="wipro-iAssure" row>
      <ButtonGroup variant="default" />
      <ButtonGroup variant="success" />
      <ButtonGroup variant="error" />
    </ThemedBackground>
  ));
