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
  input = screen.getByTestId("test-field");
  // editButton = screen.getByTestId("edit-button");
});

test("Check initial value and label", () => {
  // Checking initial value of input field
  // expect(input?.value).toBe("initial value");

  // Checking value of label
  // const inputField =compo("presentation");
  // const inputField = input.querySelector("input");
  // fireEvent.click(inputField);
  // console.log("********************\n", input);
  // fireEvent.keyPress(input, { key: "t", charCode: 84 });
  // expect(input).toHaveProperty("value", "t");
  // expect(input).toHaveProperty("value", "test value");
  // const openButton = screen.getByTitle("Open");
  // console.log("********************\n", openButton);
  const openButton = input.querySelector("button");
  console.log("button**********", openButton);
  fireEvent.click(openButton as HTMLElement);

  const options = screen.getByRole("presentation");

  // const inputField = input.querySelectorAll("input");

  // console.log("**************test input", inputField);
  console.log("optoin list**********", options);
});

// test("Edit the text and check if it has value is saved correctly", () => {
//   // Clicking to change it to edit mode
//   fireEvent.click(editButton);

//   // Change <input> value
//   fireEvent.change(input as Element, { target: { value: "Hello World!" } });
//   fireEvent.focusOut(component);

//   // Check if the value is saved
//   expect(input?.value).toBe("Hello World!");
// });

// test("Edit the text to make it empty and check if it has value is returned to the previous value", () => {
//   // Clicking to change it to edit mode
//   fireEvent.click(editButton);

//   // Change <input> value
//   fireEvent.change(input as Element, { target: { value: "" } });
//   fireEvent.blur(input as Element);

//   // Check if the value is saved
//   expect(input?.value).toBe("initial value");
// });
