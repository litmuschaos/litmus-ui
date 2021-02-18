import { render } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Modal } from "../Modal";

describe("Modal Component", () => {
  it("Renders", () => {
    const { findByTitle } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <Modal open={true} onClose={() => console.log("clicked")}>
          <>Modal</>
        </Modal>
      </LitmusThemeProvider>
    );

    expect(findByTitle("Modal")).toBeTruthy();
  });
});
