import { render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { TextButton } from "../TextButton";

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <TextButton onClick={() => {}}>Test Button</TextButton>
    </LitmusThemeProvider>
  );
});

test("Check for inheritance of children props", () => {
  // Matching a string:
  screen.getByText("Test Button"); // full string match
  screen.getByText("est Butto", { exact: false }); // substring match
  screen.getByText("tEsT bUtToN", { exact: false }); // ignore case

  // Matching a regex:
  screen.getByText(/Button/); // substring match
  screen.getByText(/BuTtOn/i); // substring match, ignore case
  screen.getByText(/^TeSt BUttON$/i); // full string match, ignore case

  // Matching with a custom function:
  screen.getByText((content, element) => content.startsWith("Test"));

  //Negative test cases

  // Regex does not always match
  expect(() => {
    screen.getByText(/Test B?tton/i);
  }).toThrow();

  // Full string does not match
  expect(() => {
    screen.getByText("Production Button");
  }).toThrow();

  // Case-sensitive regex with different case
  expect(() => {
    screen.getByText(/test button/);
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
