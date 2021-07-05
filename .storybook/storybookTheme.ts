import { Theme } from "@material-ui/core";
import { create } from "@storybook/theming";
import { litmusPortalTheme } from "../src/theme/litmus-portal";
import litmusLogo from "/public/assets/litmusLogo.svg";

const createTheme = (theme: Theme) => {
  return create({
    base: "light",

    colorPrimary: theme.palette.background.default,
    colorSecondary: theme.palette.highlight,

    // UI
    appBg: theme.palette.background.default,
    appContentBg: theme.palette.background.default,
    appBorderColor: theme.palette.primary.light,
    appBorderRadius: theme.spacing(1),

    // Typography
    fontBase: theme.typography.fontFamily,
    fontCode: theme.typography.fontFamily,

    // Text colors
    textColor: theme.palette.text.primary,
    textInverseColor: theme.palette.text.secondary,
    textMutedColor: theme.palette.text.disabled,

    // Toolbar default and active colors
    barTextColor: theme.palette.text.hint,
    barSelectedColor: theme.palette.highlight,
    barBg: theme.palette.background.default,

    // Form colors
    inputBg: theme.palette.background.default,
    inputBorder: theme.palette.highlight,
    inputTextColor: theme.palette.text.primary,
    inputBorderRadius: theme.spacing(1),

    // Brand
    brandTitle: "Litmus-UI",
    brandUrl: "./",
    brandImage: litmusLogo,
  });
};

const LitmusUIStorybookTheme = createTheme(litmusPortalTheme);

export { LitmusUIStorybookTheme };
