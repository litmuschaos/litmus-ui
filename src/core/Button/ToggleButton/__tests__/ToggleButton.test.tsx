import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { ToggleButton } from "../ToggleButton";

describe("Toggle Button Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <ToggleButton isToggled={true} onClick={() => {}}>
          Toggle Button
        </ToggleButton>
      </LitmusThemeProvider>
    );

    expect(getByText("Toggle Button")).toBeTruthy();
  });
});
