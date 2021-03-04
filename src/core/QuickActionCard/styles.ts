import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.hint,
    fontSize: "1rem",
  },
  singleActionLink: {
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(2),
    fontSize: "1.1rem",
    fontWeight: 400,
  },
  listItems: {
    margin: theme.spacing(1.5, 0),
    padding: 0,
    "& img": {
      height: "100%",
      margin: "0.5rem",
      marginLeft: "0",
      color: theme.palette.highlight,
    },
  },
  quickActionCard: {
    backgroundColor: "inherit",
    width: "auto",
    marginLeft: theme.spacing(0.5),
  },
}));

export { useStyles };
