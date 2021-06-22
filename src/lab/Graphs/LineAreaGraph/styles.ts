import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  width: number;
  height: number;
  legendTableHeight: number;
  widthPercentageEventTable: number;
  marginLeftEventTable: number;
  showLegendTable: boolean;
  showEventTable: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  rectBase: {
    fill: theme.palette.background.paper,
  },
  rectBase2: {
    fill: "yellow",
  },
  table: (props: StyleProps) => ({
    display: "flex",
    width: props.width,
    height: props.height,
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
  }),

  tableDataRow: {
    float: "left",
    display: "flex",
    alignItems: "flex-start",
  },
  tableFont: {
    fontFamily: "Ubuntu",
    fontSize: "0.8rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "16px",
    borderBottom: "none",
    letterSpacing: "0em",
    paddingLeft: "0.5em",
    textAlign: "left",
    minWidth: "4rem",
  },

  tableHeading: {
    paddingLeft: "1.5em",
    fontSize: "0.9rem",
    color: theme.palette.graph.legendTableHeading,
    whiteSpace: "nowrap",
    fontWeight: 500,
  },

  legendMarker: {
    width: "1rem",
    height: "0.2rem",
    marginTop: "0.3rem",
    position: "absolute",
  },
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
    transform: "translate(-90%,0)",
  },
  tooltipMetricRight: {
    transform: "translate(30%,0)",
  },
  tooltipDateStyles: {
    marginLeft: "3.5rem",
    marginTop: "0.5rem",
    transform: "translate(-50%,0%)",
    backgroundColor: `${theme.palette.graph.toolTip} !important`,
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
    justifyContent: "space-between",
    padding: "0.1rem",
    color: theme.palette.text.secondary,
  },
  tooltipLabel: {
    display: "flex",
    position: "relative",
  },
  tooltipValue: {
    paddingLeft: "0.2rem",
  },

  wrapperParentLegendAndEventTable: {
    display: "flex",
    justifyContent: "space-between",
  },
  wrapperLegendTable: (props: StyleProps) => ({
    width:
      props.showEventTable && props.showLegendTable
        ? props.width * (1 - props.widthPercentageEventTable / 100) -
          props.marginLeftEventTable
        : props.width,
    height: props.legendTableHeight,
  }),
  wrapperSubDataTableForEvents: (props: StyleProps) => ({
    width:
      props.showEventTable && props.showLegendTable
        ? props.width * (props.widthPercentageEventTable / 100)
        : 0,
    height: props.legendTableHeight,
  }),
}));

const usePlotLineAreaGraphStyles = makeStyles((theme: Theme) => ({
  grid: {
    stroke: theme.palette.disabledBackground,
    strokeOpacity: 0.2,
  },
}));

export { useStyles, usePlotLineAreaGraphStyles };
