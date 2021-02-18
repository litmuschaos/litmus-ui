import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../utils/storybook";
import { Search } from "./Search";

storiesOf("Search", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal">
      <Search placeholder="Search" onChange={(e) => e.target.value} />
    </ThemedBackground>
  ));
