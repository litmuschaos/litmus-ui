import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    height: "fit-content",
    padding: theme.spacing(1.5, 2),
    minWidth: "6.25rem",
    textTransform: "none",
    fontSize: "1rem",
    "&:disabled": {
      borderColor: theme.palette.disabledBackground,
      color: theme.palette.text.disabled,
    },
  },

  // Text Button
  highlight: {
    color: theme.palette.highlight,
  },
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
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
