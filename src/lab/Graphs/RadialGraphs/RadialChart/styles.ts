import { makeStyles, Theme } from "@material-ui/core";
import { LegendTableOrientation } from "./RadialChart";

interface StyleProps {
  width: number;
  height: number;
  circleOrient?: number;
  alignLegendTable?: LegendTableOrientation;
  legendTableHeight?: number;
  innerRadius: number;
  outerRadius: number;
  arcWidth: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  radialChartRoot: (props: StyleProps) => ({
    width: props.width,
    height: props.height,
    position: "relative",
    transition: "0.5s",
    background: theme.palette.background.paper,
  }),
  rectBase: {
    fill: theme.palette.background.paper,
  },

  radialFont: {
    textAlign: "left",
    fontStyle: "normal",
  },
  centerDataFont: {
    fontStyle: "normal",
    wordWrap: "break-word",
    whiteSpace: "initial",
    textAlign: "center",
    lineHeight: "1.5rem",
    margin: theme.spacing(1, 0),
    alignContent: "flex-start",
    fontSize: "1rem",
  },
  centerValue: {
    maxWidth: "8rem",
    minWidth: "6rem",
    fontSize: "1.5rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
  },

  centerText: {
    width: "6rem",
    fontSize: "1rem",
    fontWeight: 300,
    color: theme.palette.text.hint,
  },

  centerDataContainer: (props: StyleProps) => ({
    position: "absolute",
    top:
      props.circleOrient === 1
        ? props.innerRadius
        : props.innerRadius + props.arcWidth,
    left: props.alignLegendTable === "bottom" ? "50%" : "25%",
    transform: "translate(-50%, -50%)",
  }),

  legendTableArea: (props: StyleProps) => ({
    display: "flex",
    width: props.alignLegendTable === "bottom" ? props.width : props.width / 2,
    height:
      props.alignLegendTable === "bottom"
        ? props.circleOrient === 1
          ? props.height - props.outerRadius
          : props.height - props.outerRadius * 2
        : props.circleOrient === 1
        ? props.outerRadius
        : props.outerRadius * 2,
    alignItems: props.alignLegendTable === "right" ? "center" : "unset",
  }),

  legendTableChild: (props: StyleProps) => ({
    width: "inherit",
    height: props.legendTableHeight,
  }),

  figureWithLegendTable: (props: StyleProps) => ({
    display: props.alignLegendTable === "bottom" ? "inline-block" : "flex",
    height:
      props.alignLegendTable === "bottom"
        ? props.height
        : props.circleOrient === 1
        ? props.outerRadius
        : props.outerRadius * 2,
  }),
}));
export { useStyles };
