import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { KuberaCard } from "../KuberaCard";

describe("Button Filled Component", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <KuberaCard width="15rem" height="20rem" borderColor="#5B44BA" glow>
          Card With Glow
        </KuberaCard>
      </LitmusThemeProvider>
    );

    expect(getByText("Card With Glow")).toBeTruthy();
  });
});
