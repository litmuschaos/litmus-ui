import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { ButtonFilled } from "../ButtonFilled";

storiesOf("Button/Button Filled", module)
  // Litmus Portal
  .add("Litmus Portal", () => {
    return (
      <ThemedBackground platform="litmus-portal" row>
        <ButtonFilled variant="default" onClick={() => console.log("clicked")}>
          Button Filled Default
        </ButtonFilled>

        <ButtonFilled variant="error" onClick={() => console.log("clicked")}>
          Button Filled Error
        </ButtonFilled>

        <ButtonFilled variant="success" onClick={() => console.log("clicked")}>
          Button Filled Success
        </ButtonFilled>

        <ButtonFilled disabled onClick={() => console.log("clicked")}>
          Button Filled Disabled
        </ButtonFilled>
      </ThemedBackground>
    );
  })
  // Wipro IAssure
  .add("Wipro IAssure", () => {
    return (
      <ThemedBackground platform="wipro-iAssure" row>
        <ButtonFilled variant="default" onClick={() => console.log("clicked")}>
          Button Filled Default
        </ButtonFilled>

        <ButtonFilled variant="error" onClick={() => console.log("clicked")}>
          Button Filled Error
        </ButtonFilled>

        <ButtonFilled variant="success" onClick={() => console.log("clicked")}>
          Button Filled Success
        </ButtonFilled>

        <ButtonFilled disabled onClick={() => console.log("clicked")}>
          Button Filled Disabled
        </ButtonFilled>
      </ThemedBackground>
    );
  });
