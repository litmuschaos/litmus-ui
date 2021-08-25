import { render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Typography } from "../Typography";

let component: HTMLElement;
const textContent = "The quick brown fox jumps over the lazy dog";

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <Typography variant="heading2" fontWeight="bold" fontStyle="italic">
        {textContent}
      </Typography>
    </LitmusThemeProvider>
  );

  // Get EditableText component
  component = screen.getByTestId("typography");
});

test("Check the contents of the paragraph", () => {
  // Check text is rendered or not
  expect(component.textContent).toBe(textContent);
});

test("Check if the component contains correct styles", () => {
  // Check text is heading2 (font-size: 48px)
  expect(component.className).toMatch(/heading2/);

  // Check text is bold
  expect(component.className).toMatch(/bold/);

  // Check text is italic
  expect(component.className).toMatch(/italic/);
});
