import { screen } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../..";
import { QuickActionCard } from "../QuickActionCard";
import { quickActionsTestData } from "../testData";

afterEach(cleanup);
jest.useFakeTimers();

describe("EditablText component", () => {
  it("Renders", () => {
    render(
      <LitmusThemeProvider platform="litmus-portal">
        <QuickActionCard
          quickActions={quickActionsTestData}
          title={"Quick Actions"}
        />
      </LitmusThemeProvider>
    );

    // Get QuickActionCard component
    const quickActionCardComponent = screen.getByTestId(
      "quickActionCardComponent"
    );

    expect(quickActionCardComponent).toBeTruthy();
    const pTags = quickActionCardComponent.querySelector("p") as HTMLElement;
  });
});
