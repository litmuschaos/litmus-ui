import { render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Icon } from "../Icon";

let component: HTMLElement;

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <Icon name="check" size="xl" color="purple" />
    </LitmusThemeProvider>
  );

  // Get icon component
  component = screen.getByTestId("icon-component");
});

test("Check the Icon className and name", () => {
  // check componenet is div
  expect(component?.tagName).toBe("DIV");
  // check the class of the component
  expect(component?.className.includes("container")).toBe(true);
  // check alt text to be the same as the name of the Icon
  expect(component?.getElementsByTagName("img")[0].alt).toBe("check");
});
