import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { InputField } from "../InputField";

afterEach(cleanup);
jest.useFakeTimers();

describe("InputField component", () => {
  it("Renders", () => {
    render(
      <LitmusThemeProvider platform="litmus-portal">
        <InputField
          label="Text Input"
          variant="primary"
          type="text"
          disabled={false}
          onChange={() => console.log("change")}
        />
      </LitmusThemeProvider>
    );
    //get OutlinedInput byRole
    const input = screen.getByTestId("inputField");
    //get input from TextField
    const inputValue = input.querySelector("input") as HTMLElement;
    //check attributes
    expect(inputValue).toHaveProperty("type", "text");
    expect(inputValue).toHaveProperty("disabled", false);
    expect(inputValue).toHaveProperty("value", "");
    //pass text value
    fireEvent.change(inputValue, { target: { value: "random text" } });
    //check passed text value
    expect(inputValue).toHaveProperty("value", "random text");
    //change input type
    fireEvent.change(inputValue, { target: { type: "password" } });
    //check input type
    expect(inputValue).toHaveProperty("type", "password");
  });
});
