import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { Paragraph } from "./Paragraph";

storiesOf("Text/ParagraphText", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground row>
      <Paragraph>Paragraph Text Primary</Paragraph>
      <Paragraph color={"green"}>Paragraph Text Colored</Paragraph>
      <Paragraph variant="small">Paragraph Text Small</Paragraph>
      <Paragraph variant="bold">Paragraph Text Bold</Paragraph>
    </ThemedBackground>
  ));
