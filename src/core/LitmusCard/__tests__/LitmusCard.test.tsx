import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { LitmusCard } from "../LitmusCard";

describe("Button Filled Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <LitmusCard width="15rem" height="20rem" borderColor="#5B44BA" glow>
          Card With Glow
        </LitmusCard>
      </LitmusThemeProvider>
    );

    expect(getByText("Card With Glow")).toBeTruthy();
  });
});
