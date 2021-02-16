import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { OutlinedPills } from "../../../Pills";

describe("Basic Pills Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <OutlinedPills label="Outlined Pill" />
      </LitmusThemeProvider>
    );

    expect(getByText("Outlined Pill")).toBeTruthy();
  });
});
