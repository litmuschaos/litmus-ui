import { render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { OutlinedPills } from "../../../Pills";

let label: HTMLElement;
beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <OutlinedPills label="succeeded" variant="succeeded" />
    </LitmusThemeProvider>
  );

  // Get label for the pill
  label = screen.getByText("succeeded");
});

test("Renders outlined pill of 'succeeded' variant", () => {
  expect(label.textContent).toBe("succeeded");
});
