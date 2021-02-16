import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Tabs } from "../Tabs";

afterEach(cleanup);
jest.useFakeTimers();

describe("Tabs", () => {
  it("Renders", () => {
    const { getByText } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <Tabs
          value={"1"}
          onChange={() => {
            console.log(true);
          }}
          label={["Tab Item", "Tab Item two"]}
          content={["Tab Content", "Item two content"]}
        ></Tabs>
      </LitmusThemeProvider>
    );
    fireEvent.click(getByText("Tab Item two"));
    expect(screen.getByText("Item two content")).toBeTruthy();
  });
});
