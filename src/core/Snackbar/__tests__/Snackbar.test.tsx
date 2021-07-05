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
  screen.getByText("est Snack", { exact: false }); // substring match
  screen.getByText("tEsT sNaCkBaR", { exact: false }); // ignore case

  // Matching a regex:
  screen.getByText(/Snackbar/); // substring match
  screen.getByText(/sNaCkBaR/i); // substring match, ignore case
  screen.getByText(/^tEsT sNaCkBaR$/i); // full string match, ignore case

  // Matching with a custom function:
  screen.getByText((content, element) => content.startsWith("Test"));

  //Negative test cases

  // Regex does not always match
  expect(() => {
    screen.getByText(/Test S?ackbar/i);
  }).toThrow();

  // Full string does not match
  expect(() => {
    screen.getByText("Production Snackbar");
  }).toThrow();

  // Case-sensitive regex with different case
  expect(() => {
    screen.getByText(/test snackbar/);
  }).toThrow();

  // Function looking for a paragraph when it's actually a span:
  expect(() => {
    screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "p" && content.startsWith("Test")
      );
    });
  }).toThrow();
});
