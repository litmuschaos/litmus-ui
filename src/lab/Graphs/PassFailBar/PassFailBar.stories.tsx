import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { PassFailBar } from "./PassFailBar";

storiesOf("Graphs/PassFailBar", module).add("Litmus Portal", () => (
  <ThemedBackground>
    <div style={{ height: "2rem", width: "15rem" }}>
      <PassFailBar passValue={60} />
    </div>
  </ThemedBackground>
));
