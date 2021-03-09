import { storiesOf } from "@storybook/react";
import React from "react";
import { LitmusCard } from ".";
import { ThemedBackground } from "../../utils/storybook";

const cardContainer = (content: string) => (
  <div
    style={{
      textAlign: "center",
      marginTop: "50%",
      fontSize: "1.2rem",
    }}
  >
    {content}
  </div>
);

storiesOf("Card", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground row>
      <LitmusCard width="15rem" height="20rem" borderColor="#5B44BA" glow>
        {cardContainer("Card With Glow")}
      </LitmusCard>
      <LitmusCard width="15rem" height="20rem" borderColor="#5B44BA">
        {cardContainer("Card Without Glow")}
      </LitmusCard>
    </ThemedBackground>
  ));
