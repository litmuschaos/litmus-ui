import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    height: "fit-content",
    padding: theme.spacing(1.5, 2),
    minWidth: "6.25rem",
    minHeight: "2.75rem",
    textTransform: "none",
    background: "transparent",
    fontSize: "1rem",
    borderColor: theme.palette.highlight,
    "&:disabled": {
      borderColor: theme.palette.disabledBackground,
      color: theme.palette.text.disabled,
    },
  },

  // Button Outlined
  highlight: {
    color: theme.palette.highlight,
  },

  // Sizes
  large: {
    padding: theme.spacing(2, 4),
  },
  medium: {
    padding: theme.spacing(1.5, 2.5),
  },
  small: {
    padding: theme.spacing(1, 1.25),
  },
}));

export { useStyles };
