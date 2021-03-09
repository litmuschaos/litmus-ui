import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { ToggleButton } from "./ToggleButton";

storiesOf("Button/Toggle Button", module)
  // Litmus Portal
  .add("Litmus Portal", () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground platform="litmus-portal" row>
        <ToggleButton isToggled={open} onClick={() => setOpen(!open)}>
          Toggle Button
        </ToggleButton>
        {open ? <p>Toggled</p> : <p>Not toggled</p>}
      </ThemedBackground>
    );
  })
  // Wipro IAssure
  .add("Wipro IAssure", () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground platform="wipro-iAssure" row>
        <ToggleButton isToggled={open} onClick={() => setOpen(!open)}>
          Toggle Button
        </ToggleButton>
        {open ? <p>Toggled</p> : <p>Not toggled</p>}
      </ThemedBackground>
    );
  });
