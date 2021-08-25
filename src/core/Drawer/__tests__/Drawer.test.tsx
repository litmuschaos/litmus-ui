import { Typography } from "@material-ui/core";
import { render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Drawer } from "../Drawer";

let draweritems: HTMLElement;
let closebtn: HTMLElement;

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <Drawer
        open={true}
        icon={"close"}
        anchor={"left"}
        onButtonClose={() => {}}
      >
        <Typography>Drawer</Typography>
      </Drawer>
    </LitmusThemeProvider>
  );
  draweritems = screen.getByTestId("drawer-items");
  closebtn = screen.getByTestId("close-btn");
});

test("Check if drawer items are visible", () => {
  expect(draweritems.textContent).toBe("Drawer");
});

test("Check if close button are visible", () => {
  expect(closebtn).toBeTruthy();
});
