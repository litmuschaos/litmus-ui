import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  rectBase: {
    fill: theme.palette.background.paper,
  },

  tooltipMetric: {
    zIndex: 3,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: `${theme.palette.cards.background} !important`,
  },
  tooltipMetricLeft: {
    transform: "translate(-75%,0)",
  },
  tooltipMetricRight: {
    transform: "translate(75%,0)",
  },
}));

export { useStyles };
