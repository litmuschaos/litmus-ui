import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.hint,
    fontSize: "0.875rem",
  },
  singleActionLink: {
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(2),
    fontSize: "1rem",
    fontWeight: 400,
  },
  listItems: {
    height: "1.3rem",
    margin: 0,
    padding: 0,
    marginTop: theme.spacing(2),
    "& img": {
      height: "100%",
      margin: "auto",
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

export default useStyles;
