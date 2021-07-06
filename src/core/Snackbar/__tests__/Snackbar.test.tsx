import { render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Snackbar } from "../Snackbar";

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <Snackbar message={"Test Snackbar"} open={true} />
    </LitmusThemeProvider>
  );
});

test("Check for inheritance of children props", () => {
  // Matching a string:
  screen.getByText("Test Snackbar"); // full string match
});
