import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { EditableText } from "../EditableText";

let component: HTMLElement;
let input: HTMLInputElement | null;
let editButton: HTMLElement;

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <EditableText
        label="Edit Me"
        defaultValue="initial value"
        onSave={() => {}}
      />
    </LitmusThemeProvider>
  );

  // Get EditableText component
  component = screen.getByTestId("editable-text");

  input = component.querySelector("input");
  editButton = screen.getByTestId("edit-button");
});

test("Check initial value and label", () => {
  // Checking initial value of input field
  expect(input?.value).toBe("initial value");

  // Checking value of label
  fireEvent.click(editButton);
  const label = component.querySelector("label");
  expect(label?.innerHTML).toBe("Edit Me");
});

test("Edit the text and check if it has value is saved correctly", () => {
  // Clicking to change it to edit mode
  fireEvent.click(editButton);

  // Change <input> value
  fireEvent.change(input as Element, { target: { value: "Hello World!" } });
  fireEvent.focusOut(component);

  // Check if the value is saved
  expect(input?.value).toBe("Hello World!");
});

test("Edit the text to make it empty and check if it has value is returned to the previous value", () => {
  // Clicking to change it to edit mode
  fireEvent.click(editButton);

  // Change <input> value
  fireEvent.change(input as Element, { target: { value: "" } });
  fireEvent.blur(input as Element);

  // Check if the value is saved
  expect(input?.value).toBe("initial value");
});
