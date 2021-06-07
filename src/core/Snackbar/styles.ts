import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    //
  },

  // SnackBar variants
  success: {
    "& .MuiSnackbarContent-root": {
      background: `${theme.palette.success.main}`,
    },
  },
  warning: {
    "& .MuiSnackbarContent-root": {
      background: `${theme.palette.warning.main}`,
    },
  },
  error: {
    "& .MuiSnackbarContent-root": {
      background: `${theme.palette.error.main}`,
    },
  },
}));

export { useStyles };
