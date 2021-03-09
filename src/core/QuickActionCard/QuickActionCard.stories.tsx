import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../utils/storybook";
import { QuickActionCard } from "./QuickActionCard";
import { quickActionTestData } from "./testData";

storiesOf("QuickAction", module).add("Litmus Portal", () => (
  <ThemedBackground row>
    <QuickActionCard
      quickActions={quickActionTestData}
      title={"Quick Actions"}
    />
  </ThemedBackground>
));
