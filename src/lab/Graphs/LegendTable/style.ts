import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "3px",
      height: "3px",
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "3px",
    },

    "&::-webkit-scrollbar-corner": {
      backgroundColor: theme.palette.background.paper,
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.highlight,
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.palette.highlight,
    },
  },
  tableRow: {
    display: "flex",
    border: "none",
  },
  tableCell: {
    border: "none",
    alignContent: "flex-start",
    padding: theme.spacing(0.7, 1),
  },

  tableHeading: {
    border: "none",
    color: theme.palette.graph.dashboard.lightBlue,
    minWidth: "4rem",
    "&:first-child": {
      flexGrow: 1,
    },
  },
  tableLabel: {
    display: "flex",
    minWidth: "4rem",
    flexGrow: 1,
  },
  tableData: {
    minWidth: "4rem",
    alignContent: "flex-start",
  },
  tableFont: {
    wordWrap: "break-word",
    whiteSpace: "initial",
    alignContent: "flex-start",
    color: theme.palette.text.primary,
  },
  legendMarker: {
    width: "1rem",
    height: "0.2rem",
    alignSelf: "baseline",
    marginRight: "0.5em",
    marginTop: "0.5rem",
  },
}));

export { useStyles };
