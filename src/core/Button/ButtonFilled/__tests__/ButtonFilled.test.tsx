import { render } from "@testing-library/react";
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
});
