import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { ButtonFilled } from "../ButtonFilled";

describe("Button Filled Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider>
        <ButtonFilled onClick={() => {}}>Button Filled</ButtonFilled>
      </LitmusThemeProvider>
    );

    expect(getByText("Button Filled")).toBeTruthy();
  });

  it("should be clickable", () => {
    const mockCallBack = jest.fn();
    const { getByText } = render(
      <LitmusThemeProvider>
        <ButtonFilled onClick={mockCallBack}>Button Filled</ButtonFilled>
      </LitmusThemeProvider>
    );

    const Button = getByText("Button Filled");

    // Clicking once
    fireEvent.click(Button);
    expect(mockCallBack.mock.calls.length).toEqual(1);

    // Clicking twice
    fireEvent.click(Button);
    fireEvent.click(Button);
    expect(mockCallBack.mock.calls.length).toEqual(3); // Total three clicks registered on DOM
  });
});
