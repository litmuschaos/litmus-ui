import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    margin: "1rem",
  },
  rectBase: {
    fill: theme.palette.background.paper,
  },
  tooltipMetric: {
    zIndex: 3,
    marginTop: "1rem",
    padding: `0 !important`,
  },
  tooltipMetricLeft: {
    transform: "translate(-75%,0)",
  },
  tooltipMetricRight: {
    transform: "translate(75%,0)",
  },
}));

export { useStyles };
