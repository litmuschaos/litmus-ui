import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { PassFailBar } from "./PassFailBar";

storiesOf("Graphs/PassFailBar", module).add("Litmus Portal", () => (
  <ThemedBackground>
    <div style={{ height: "4rem", width: "20rem" }}>
      <PassFailBar passPercentage={90} />
    </div>
  </ThemedBackground>
));
