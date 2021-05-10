import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    color: theme.palette.border.main,
    "& label": {
      color: theme.palette.border.main,
    },
  },
  checkbox: {
    color: theme.palette.primary.main,
  },
  chip: {
    margin: theme.spacing(1, 1, 0, 0),
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: "3px",
    "& svg": {
      color: theme.palette.text.secondary,
    },
  },
}));

export { useStyles };
