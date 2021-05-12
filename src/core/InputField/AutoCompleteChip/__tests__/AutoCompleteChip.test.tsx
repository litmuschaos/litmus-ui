import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { AutoCompleteChip } from "../AutoCompleteChip";
import { testData } from "../testData";

// let component: HTMLElement;
let input: HTMLElement;
// let editButton: HTMLElement;

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <AutoCompleteChip
        onChange={(event: any, value: any) => console.log(value, event)}
        options={testData}
        label="label"
        placeholder="placeholder"
        multiple={true}
        disableCloseOnSelect={true}
      />
    </LitmusThemeProvider>
  );

  // Get AutoCompleteChip component
  // component = screen.getByTestId("autoComplete");
});

test("Check initial value and label", () => {
  input = screen.getByTestId("test-field");
  console.log("##########1", input);

  const inputField = input.querySelector("input");
  console.log("##########2", inputField);
  if (inputField) {
    // at this point, typescript knows that inputField cannot be null
    // so it has HTMLElement type in the block
    fireEvent.click(inputField);
    // fireEvent.click(inputField);

    // fireEvent.keyPress(inputField, { key: "A", code: "KeyA" });
    // fireEvent.keyDown(inputField, { key: "B", code: "KeyA" });
    // fireEvent.change(inputField, { target: { value: "2020-05-24" } });
    fireEvent.change(inputField as Element, { target: { value: "the" } });
    expect(inputField.value).toBe("the");

    console.log("##########3 click fired");
  }
  // fireEvent.click(inputField);
  // fireEvent.change(inputField, { target: { value: "a" } });
});
