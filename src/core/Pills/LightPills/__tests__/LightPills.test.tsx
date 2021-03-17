import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { LightPills } from "../LightPills";

describe("Light Pills Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider>
        <LightPills variant="success" label="Success" />
      </LitmusThemeProvider>
    );

    expect(getByText("Success")).toBeTruthy();
  });
});
