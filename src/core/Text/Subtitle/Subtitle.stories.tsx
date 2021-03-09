import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { Subtitle } from "./Subtitle";

storiesOf("Text/SubtitleText", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal" row>
      <Subtitle>Subtitle Text Primary</Subtitle>
      <Subtitle color={"green"}>Subtitle Text Colored</Subtitle>
      <Subtitle variant="bold">Subtitle Text Bold</Subtitle>
      <Subtitle variant="small">Subtitle Text Small</Subtitle>
    </ThemedBackground>
  ))
  // Wipro IAssure
  .add("Wipro IAssure", () => (
    <ThemedBackground platform="wipro-iAssure" row>
      <Subtitle>Subtitle Text Primary</Subtitle>
      <Subtitle color={"green"}>Subtitle Text Colored</Subtitle>
      <Subtitle variant="bold">Subtitle Text Bold</Subtitle>
      <Subtitle variant="small">Subtitle Text Small</Subtitle>
    </ThemedBackground>
  ));
