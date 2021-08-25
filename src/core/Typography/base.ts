import { TypographyProps } from "@material-ui/core/Typography";

export type TypographyBaseProps = Omit<
  TypographyProps,
  "variant" | "variantMapping" | "color"
>;

export type Variant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "subtitle"
  | "body1"
  | "body2"
  | "button1"
  | "button2"
  | "caption"
  | "overline";

export type FontWeight =
  | "light" // 300
  | "regular" //400
  | "medium" //500
  | "semiBold" //600
  | "bold" //700
  | "extraBold" //800
  | "black"; //900

export type FontStyle = "normal" | "italic";

export type FontColor = "primary" | "secondary" | "disabled" | "hint";
