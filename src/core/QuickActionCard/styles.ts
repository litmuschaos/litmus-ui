import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItems: {
    marginTop: theme.spacing(1),
    "& p": {
      color: theme.palette.text.primary,
      paddingLeft: theme.spacing(2),
      textDecoration: "none",
      margin: 0,
    },
    "& img": {
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
