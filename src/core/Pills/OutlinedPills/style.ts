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
    color: theme.palette.status.workflow.failed,
    border: `0.025rem solid  ${theme.palette.status.workflow.failed}`,
    "& svg": {
      "& path ": {
        stroke: theme.palette.status.workflow.failed,
      },
    },
  },
  succeeded: {
    color: theme.palette.status.workflow.completed,
    border: `0.025rem solid  ${theme.palette.status.workflow.completed}`,
    "& svg": {
      "& path": {
        stroke: theme.palette.status.workflow.completed,
      },
    },
  },
  pending: {
    color: theme.palette.status.workflow.pending,
    border: `0.025rem solid  ${theme.palette.status.workflow.pending}`,
    "& svg": {
      "& path": {
        stroke: theme.palette.status.workflow.pending,
      },
    },
  },
  running: {
    color: theme.palette.status.workflow.running,
    border: `0.025rem solid  ${theme.palette.status.workflow.running}`,
    "& svg": {
      "& path": {
        stroke: theme.palette.status.workflow.running,
      },
    },
  },
}));

export { useStyles };
