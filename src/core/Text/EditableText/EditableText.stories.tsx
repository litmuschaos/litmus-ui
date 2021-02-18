import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { ThemedBackground } from "../../../utils/storybook";
import { EditableText } from "./EditableText";

storiesOf("text/EditableText", module).add("Litmus Portal", () => {
  const [valueText, setValueText] = useState("Hello World");
  return (
    <ThemedBackground platform="litmus-portal">
      <div style={{ width: "80vw" }}>
        <EditableText
          label="Normal text field"
          value={valueText}
          onChange={(e) => setValueText(e.target.value)}
          fullWidth
        />
        <br />
        <EditableText
          label="Normal text field"
          value={valueText}
          multiline
          onChange={(e) => setValueText(e.target.value)}
          fullWidth
        />
        <EditableText
          label="Normal text field"
          value={valueText}
          variant="error"
          multiline
          onChange={(e) => setValueText(e.target.value)}
          fullWidth
        />
        <EditableText
          label="Normal text field"
          value={valueText}
          disabled
          multiline
          onChange={(e) => setValueText(e.target.value)}
          fullWidth
        />
      </div>
    </ThemedBackground>
  );
});
