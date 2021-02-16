import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { Paragraph } from "../../Paragraph";

describe("Text Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <Paragraph>Paragraph Text</Paragraph>
      </LitmusThemeProvider>
    );

    expect(getByText("Paragraph Text")).toBeTruthy();
  });
});
