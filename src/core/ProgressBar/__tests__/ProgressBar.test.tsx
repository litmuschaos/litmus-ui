import { render, screen } from "@testing-library/react";
import { default as React } from "react";
import { LitmusThemeProvider } from "../../../theme";
import { ProgressBar } from "../ProgressBar";

let component: HTMLElement;

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <ProgressBar value={80} color={"red"} />
    </LitmusThemeProvider>
  );

  // Get AutocompleteChipInput component
  component = screen.getByTestId("linear-Progress");
});

test("Check value of the linear progress", () => {
  // Check value
  expect(component.getAttribute("aria-valuenow")).toBe("80");
});
