import React from "react";
import { Variant } from "./base";
import { Typography } from "./Typography";

export default {
  title: "Core/Typography/Typography Overview",
  component: Typography,
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

const variants = {
  heading1: "H1/Inter/60px",
  heading2: "H2/Inter/48px",
  heading3: "H3/Inter/32px",
  heading4: "H4/Inter/28px",
  heading5: "H5/Inter/24px",
  heading6: "H6/Inter/20px",
  subtitle: "Subtitle/Inter/18px",
  body1: "Body 1/Inter/16px",
  body2: "Body 2/Inter/14px",
  button1: "Button/Inter/16px",
  button2: "Button/Inter/14px",
  caption: "Caption/Inter/12px",
  overline: "Overline/Inter/10px",
};

export const TypographyOverview = () => {
  console.log(variants);
  return (
    <div>
      {Object.entries(variants).map(([key, value]) => (
        <>
          <Typography variant={key as Variant}>{value}</Typography>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};
