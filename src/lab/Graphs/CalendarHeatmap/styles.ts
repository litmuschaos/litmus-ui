import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  tooltipLine: {
    stroke: theme.palette.graph.toolTip,
    strokeWidth: 4,
    pointerEvents: "none",
  },
  tooltipMetric: {
    zIndex: 3,
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: `${theme.palette.cards.background} !important`,
  },
  tooltipMetricLeft: {
    transform: "translate(-70%,0)",
  },
  tooltipMetricRight: {
    transform: "translate(50%,0)",
  },
  tooltipDateStyles: {
    marginLeft: "3.5rem",
    marginTop: "0.5rem",
    transform: "translate(-50%,0%)",
    backgroundColor: `${theme.palette.background.paper} !important`,
  },
  tooltipData: {
    display: "flex",
    color: theme.palette.text.primary,
    justifyContent: "space-between",
    padding: "0.2rem",
    "& span": {
      paddingLeft: "1.5rem",
      maxWidth: "20rem",
      lineHeight: "1rem",
    },
  },
  tooltipBottomDate: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.1rem",
    color: theme.palette.text.primary,
  },
  tooltipLabel: {
    display: "flex",
    position: "relative",
  },
  tooltipValue: {
    paddingLeft: "0.2rem",
  },
}));

export { useStyles };
