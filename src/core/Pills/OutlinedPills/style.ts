import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5, 0.75),
    borderRadius: "0.125rem",
    fontSize: "0.625rem",
    fontWeight: 400,
    textTransform: "none",
    "& .MuiChip-icon": {
      marginLeft: 0,
    },
    "& .MuiChip-label": {
      padding: theme.spacing(0, 0, 0, 1.25),
    },
  },
  failed: {
    color: theme.palette.status.failed,
    border: `0.025rem solid  ${theme.palette.status.failed}`,
  },
  succeeded: {
    color: theme.palette.status.completed,
    border: `0.025rem solid  ${theme.palette.status.completed}`,
  },
  pending: {
    color: theme.palette.status.pending,
    border: `0.025rem solid  ${theme.palette.status.pending}`,
  },
  running: {
    color: theme.palette.status.running,
    border: `0.025rem solid  ${theme.palette.status.running}`,
  },
}));

export { useStyles };
