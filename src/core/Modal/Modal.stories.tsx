import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { ThemedBackground } from "../../utils/storybook";
import { ButtonFilled, ButtonOutlined } from "../Button";
import { Modal } from "./Modal";

storiesOf("Modal/Base Modal", module)
  // Litmus Portal
  .add("Litmus Portal", () => {
    const [open, setOpen] = useState(false);
    return (
      <ThemedBackground>
        <ButtonFilled onClick={() => setOpen(true)}>Open Modal</ButtonFilled>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          disableBackdropClick
          disableEscapeKeyDown
          modalActions={
            <ButtonOutlined onClick={() => setOpen(false)}>
              &#x2715;
            </ButtonOutlined>
          }
          height={"30%"}
        >
          <div
            style={{
              padding: "2.5rem",
              fontSize: "2rem",
              marginBottom: "15rem",
            }}
          >
            Modalsdlkfjldksjfldklsjfldjfljsdfljfdflkdjfdkfjlksdjf
            dfkdfdfdfdfdfdfdfdf
          </div>
        </Modal>
      </ThemedBackground>
    );
  });
