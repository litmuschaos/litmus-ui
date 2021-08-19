import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Drawer } from "../Drawer";

describe("Drawer Component", () => {
  it("Renders", () => {
    const { findByTitle } = render(
      <LitmusThemeProvider>
        <Drawer
          open={true}
          anchor={"left"}
          onClose={() => console.log("clicked")}
        >
          <>Drawer</>
        </Drawer>
      </LitmusThemeProvider>
    );

    expect(findByTitle("Drawer")).toBeTruthy();
  });
});
