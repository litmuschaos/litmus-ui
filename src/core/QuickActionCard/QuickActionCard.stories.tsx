import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../utils/storybook";
import { QuickActionCard } from "./QuickActionCard";
import { quickActionsTestData } from "./testData";

storiesOf("QuickAction", module).add("Litmus Portal", () => (
  <ThemedBackground platform="litmus-portal" row>
    <QuickActionCard
      quickActions={quickActionsTestData}
      title={"Quick Actions"}
    />
  </ThemedBackground>
));
