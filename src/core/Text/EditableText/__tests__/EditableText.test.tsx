import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { EditableText } from "../EditableText";

afterEach(cleanup);
jest.useFakeTimers();

describe("EditableText component", () => {
  it("Renders", () => {
    render(
      <LitmusThemeProvider platform="litmus-portal">
        <EditableText
          value={"test value"}
          label="Text Input"
          type="text"
          disabled={false}
          onChange={() => console.log("change")}
        />
      </LitmusThemeProvider>
    );
    // Get editText component
    const editTextComponent = screen.getByTestId("editableText");
    const textValue = editTextComponent.querySelector("p") as HTMLElement;
    const editBtn = screen.getByTestId("edit-btn");

    // Checking initial value of Typography <p> tag
    expect(textValue.textContent).toBe("test value");

    // Cilcking to change it to edit mode
    fireEvent.click(editBtn);
    const saveBtn = screen.getByTestId("save-btn");

    // Typography replaced with input field
    const input = editTextComponent.querySelector("input") as HTMLElement;

    // Test <input>
    expect(input).toHaveProperty("type", "text");
    expect(input).toHaveProperty("value", "test value");
    fireEvent.click(saveBtn);

    // Click to edit <input>
    fireEvent.click(editBtn);

    // change <input> value
    fireEvent.change(input, { target: { value: "Good Day" } });
    expect(input).toHaveProperty("value", "Good Day");

    // Back to typography
    fireEvent.click(saveBtn);
  });
});
