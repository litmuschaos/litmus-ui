import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemedBackground } from "../../utils/storybook";
import { Link } from "../Link";

storiesOf("Link", module)
  // Litmus Portal
  .add("Litmus Portal", () => (
    <ThemedBackground>
      <Router>
        <Link disabled={false} target="_blank" to="/home">
          Link
        </Link>
      </Router>
    </ThemedBackground>
  ));
