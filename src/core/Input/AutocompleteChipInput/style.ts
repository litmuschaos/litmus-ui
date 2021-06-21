import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
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
    marginRight: theme.spacing(2),
  },
  chip: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "-webkit-fill-available",
    margin: theme.spacing(1, 1, 0, 0),
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: "3px",
    "& svg": {
      color: theme.palette.text.secondary,
    },
    "& svg:hover": {
      color: theme.palette.text.secondary,
    },
  },
}));

export { useStyles };
