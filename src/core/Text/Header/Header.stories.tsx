import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { Header } from "./Header";

storiesOf("Text/HeaderText", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground row>
      <Header>Header Text Primary</Header>
      <Header variant="bold">Header Text Bold</Header>
      <Header variant="small">Header Text Small</Header>
      <Header color={"green"}>Header Text Colored</Header>
    </ThemedBackground>
  ));
