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
    expect(quickActionCardComponent).toBeTruthy();

    // Get element using alt text and check src
    const image_01 = screen.getByAltText("1");
    const testUrl = new RegExp("[.]*testUrl[0-9]", "g");
    expect(image_01.getAttribute("src")).toMatch(testUrl);

    const image_02 = screen.getByAltText("2");
    expect(image_02.getAttribute("src")).toMatch(testUrl);
  });
});
