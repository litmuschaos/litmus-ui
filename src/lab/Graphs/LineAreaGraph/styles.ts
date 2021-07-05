import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  width: number;
  height: number;
  margin: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  xMax: number;
  legendTableHeight: number;
  rangeSliderHeight: number;
  widthPercentageEventTable: number;
  marginLeftEventTable: number;
  showLegendTable: boolean;
  showRangeSlider: boolean;
  showEventTable: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  rectBase: {
    fill: theme.palette.background.paper,
  },
  rectBase2: {
    fill: "yellow",
  },
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
  rangeSliderParent: (props: StyleProps) => ({
    width: props.xMax,
    height: props.rangeSliderHeight,
    marginLeft: props.margin.left,
    marginRight: props.margin.right,
    "& .MuiSlider-markLabel": {
      color: theme.palette.text.hint,
    },
  }),
  rangeSliderTooltip: {
    "& .MuiTooltip-tooltip": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      boxShadow: `0rem 0.128rem 0.384rem ${theme.shadows[1]}, 0rem 0.682rem 1.54rem ${theme.shadows[1]}`,
      fontSize: "0.625rem",
      fontWeight: 400,
    },
  },
}));

const usePlotLineAreaGraphStyles = makeStyles((theme: Theme) => ({
  grid: {
    stroke: theme.palette.disabledBackground,
    strokeOpacity: 0.2,
  },
}));

export { useStyles, usePlotLineAreaGraphStyles };
