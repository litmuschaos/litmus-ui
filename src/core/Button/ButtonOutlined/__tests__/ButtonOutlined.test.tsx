import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { ButtonOutlined } from "../../ButtonOutlined";

describe("Button Outlined Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <ButtonOutlined onClick={() => {}}>Button Outlined</ButtonOutlined>
      </LitmusThemeProvider>
    );

    expect(getByText("Button Outlined")).toBeTruthy();
  });
});
