import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { ButtonGroup } from "../ButtonGroup";

describe("ButtonGroup Component", () => {
  it("Renders", () => {
    const { getByTestId } = render(
      <LitmusThemeProvider platform="litmus-portal" data-testid="switch">
        <ButtonGroup variant="default" />
      </LitmusThemeProvider>
    );

    expect(getByTestId("switch")).toBeTruthy();
  });
});
