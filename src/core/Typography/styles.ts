import { makeStyles, Theme } from "@material-ui/core";
import { FontColor } from "./base";

interface StyleProps {
  color: FontColor;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: "Inter, Ubuntu, sans-serif",
    color: (props: StyleProps) => theme.palette.text[props.color],
  },

  // Variant
  heading1: {
    fontSize: 60,
    lineHeight: "72px",
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: 48,
    lineHeight: "56px",
  },
  heading3: {
    fontSize: 32,
    lineHeight: "36px",
  },
  heading4: {
    fontSize: 28,
    lineHeight: "32px",
    letterSpacing: 0.18,
  },
  heading5: {
    fontSize: 24,
    lineHeight: "28px",
    letterSpacing: 0.18,
  },
  heading6: {
    fontSize: 20,
    lineHeight: "24px",
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: "24px",
    letterSpacing: 0.15,
  },
  body1: {
    fontSize: 16,
    lineHeight: "24px",
  },
  body2: {
    fontSize: 14,
    lineHeight: "20px",
  },
  button1: {
    fontSize: 16,
    lineHeight: "16px",
    letterSpacing: 0.15,
  },
  button2: {
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: 1.25,
  },
  caption: {
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: 0.4,
  },
  overline: {
    fontSize: 10,
    lineHeight: "16px",
    letterSpacing: 1.5,
  },

  // FontWeight
  light: {
    fontWeight: 300,
  },
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 500,
  },
  semiBold: {
    fontWeight: 600,
  },
  bold: {
    fontWeight: 700,
  },
  extraBold: {
    fontWeight: 800,
  },
  black: {
    fontWeight: 900,
  },

  // FontStyle
  normal: {
    fontStyle: "normal",
  },
  italic: {
    fontStyle: "italic",
  },
}));

export { useStyles };
