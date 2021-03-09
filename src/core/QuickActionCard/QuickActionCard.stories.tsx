import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../utils/storybook";
import { QuickActionCard } from "./QuickActionCard";
import { quickActionTestData } from "./testData";

storiesOf("QuickAction", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground platform="litmus-portal" row>
      <QuickActionCard
        quickActions={quickActionTestData}
        title={"Quick Actions"}
      />
    </ThemedBackground>
  ))
  // Wipro IAssure
  .add("Wipro IAssure", () => (
    <ThemedBackground platform="wipro-iAssure" row>
      <QuickActionCard
        quickActions={quickActionTestData}
        title={"Quick Actions"}
      />
    </ThemedBackground>
  ));
