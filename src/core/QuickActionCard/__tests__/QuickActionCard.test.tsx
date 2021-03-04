import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../..";
import { QuickActionCard } from "../QuickActionCard";
import { quickActionTestData } from "../testData";

afterEach(cleanup);
jest.useFakeTimers();

describe("QuickActionCard", () => {
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
    expect(quickActionCardComponent).toBeTruthy();

    // Get element using alt text and check src
    for (let i = 0; i < 4; i++) {
      const image = screen.getByAltText(i.toString());
      expect(image.getAttribute("src")).toMatch(`testUrl${i}`);
    }
  });
});
