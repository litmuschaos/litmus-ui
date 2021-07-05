import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  IconButton: {
    color: theme.palette.common.white,
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
