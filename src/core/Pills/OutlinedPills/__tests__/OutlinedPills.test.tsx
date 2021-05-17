import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { OutlinedPills } from "../../../Pills";

describe("Outlined Pills Component", () => {
  it("Renders outlined pill of 'completed' variant", () => {
    const { getByText } = render(
      <LitmusThemeProvider>
        <OutlinedPills label="Completed" variant="succeeded" />
      </LitmusThemeProvider>
    );

    expect(getByText("Completed")).toBeTruthy();
  });
});
