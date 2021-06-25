import { Theme, Tooltip, withStyles } from "@material-ui/core";

const TooltipMui = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: `0rem 0.128rem 0.384rem ${theme.shadows[1]}`,
    fontSize: "0.9rem",
    fontWeight: 400,
  },
  tooltipPlacementBottom: {
    margin: theme.spacing(0.5),
    height: "1.5rem",
  },
}))(Tooltip);

export { TooltipMui };
