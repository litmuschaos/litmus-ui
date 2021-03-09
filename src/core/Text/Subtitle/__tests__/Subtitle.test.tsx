import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { Subtitle } from "../Subtitle";

describe("Text Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider>
        <Subtitle>Subtitle Text</Subtitle>
      </LitmusThemeProvider>
    );

    expect(getByText("Subtitle Text")).toBeTruthy();
  });
});
