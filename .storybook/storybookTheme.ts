import { Theme } from "@material-ui/core";
import { create } from "@storybook/theming";
import litmusLogo from "../src/assets/litmusLogo.svg";
import { litmusPortalTheme } from "../src/theme/litmus-portal";

const createTheme = (theme: Theme) => {
  return create({
    base: "light",

    colorPrimary: theme.palette.background.paper,
    colorSecondary: theme.palette.primary.light,

    // UI
    appBg: theme.palette.background.paper,
    appContentBg: theme.palette.background.paper,
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
    barSelectedColor: theme.palette.primary.light,
    barBg: theme.palette.background.paper,

    // Form colors
    inputBg: theme.palette.background.paper,
    inputBorder: theme.palette.primary.light,
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
