import { screen } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../..";
import { QuickActionCard } from "../QuickActionCard";
import { quickActionTestData } from "../testData";

afterEach(cleanup);
jest.useFakeTimers();

describe("EditablText component", () => {
  it("Renders", () => {
    render(
      <LitmusThemeProvider platform="litmus-portal">
        <QuickActionCard
          quickActions={quickActionTestData}
          title={"Quick Actions"}
        />
      </LitmusThemeProvider>
    );

    // Get QuickActionCard component
    const quickActionCardComponent = screen.getByTestId(
      "quickActionCardComponent"
    );
    const quickActionCardComponentTitle = screen.getByTestId(
      "quickActionCardComponent-title"
    );
    expect(quickActionCardComponent).toBeTruthy();

    const titleValue = quickActionCardComponentTitle.querySelector(
      "p"
    ) as HTMLElement;

    expect(titleValue.textContent).toBe("Quick Actions");
  });
});
