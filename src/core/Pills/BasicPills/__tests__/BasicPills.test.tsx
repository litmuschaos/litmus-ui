import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { Pills } from "../BasicPills";

describe("Basic Pills Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider>
        <Pills variant="default" label="Basic Pill" />
      </LitmusThemeProvider>
    );

    expect(getByText("Basic Pill")).toBeTruthy();
  });
});
