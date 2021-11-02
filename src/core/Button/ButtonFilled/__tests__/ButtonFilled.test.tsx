import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { ButtonFilled } from "../ButtonFilled";

let component: HTMLElement;
let mockCallBack = jest.fn();

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <LitmusThemeProvider>
        <ButtonFilled onClick={mockCallBack}>Button Filled</ButtonFilled>
      </LitmusThemeProvider>
    </LitmusThemeProvider>
  );

  // Get Button Filled component
  component = screen.getByText("Button Filled");
});

test("Renders", () => {
  expect(component).toBeTruthy();
});

test("should be clickable", () => {
  const Button = component;

  // Clicking once
  fireEvent.click(Button);
  expect(mockCallBack.mock.calls.length).toEqual(1);

  // Clicking twice
  fireEvent.click(Button);
  fireEvent.click(Button);
  expect(mockCallBack.mock.calls.length).toEqual(3); // Total three clicks registered on DOM
});
