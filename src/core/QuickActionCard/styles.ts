import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.hint,
  },
  singleActionLink: {
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(2),
    textDecoration: "none",
    margin: 0,
    fontSize: "0.9rem",
    fontWeight: 400,
  },
  listItems: {
    height: "1.3rem",
    margin: 0,
    padding: 0,
    marginTop: theme.spacing(2),
    "& img": {
      height: "100%",
      width: "2rem",
      margin: "auto",
      color: theme.palette.highlight,
    },
  },
  quickActionCard: {
    fontSize: "1.125rem",
    backgroundColor: "inherit",
    width: "auto",
    marginLeft: theme.spacing(0.5),
  },
}));

export default useStyles;
