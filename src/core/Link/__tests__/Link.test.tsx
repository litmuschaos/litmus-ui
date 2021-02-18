import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LitmusThemeProvider } from "../../../theme";
import { Link } from "../Link";

describe("Link component", () => {
  it("Renders", () => {
    const { getByRole } = render(
      <LitmusThemeProvider platform="litmus-portal">
        <Router>
          <Link disabled={false} to="/home">
            Link
          </Link>
        </Router>
      </LitmusThemeProvider>
    );
    const element = getByRole("navlink");
    // check href
    expect(element).toHaveProperty("href", window.location.origin + "/home");
  });
});
