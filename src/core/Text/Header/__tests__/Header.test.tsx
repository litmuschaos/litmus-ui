import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { Header } from "../Header";

describe("Text Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider>
        <Header>Header Text</Header>
      </LitmusThemeProvider>
    );

    expect(getByText("Header Text")).toBeTruthy();
  });
});
