import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    height: "fit-content",
    padding: theme.spacing(1.5, 2),
    textTransform: "none",
    background: "transparent",
    fontSize: "0.75rem",
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
}));

export { useStyles };
