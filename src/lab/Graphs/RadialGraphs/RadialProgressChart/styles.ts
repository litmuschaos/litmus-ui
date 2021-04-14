import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  width: number;
  height: number;
  circleOrient?: number;
  arcWidth: number;
  innerRadius: number;
  outerRadius: number;
  iconTop?: string;
  iconSize: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  radialChartRoot: (props: StyleProps) => ({
    width: props.width,
    height: props.height,
    position: "relative",
    transition: "0.5s",
  }),
  rectBase: {
    fill: theme.palette.background.paper,
    alignItems: "center",
  },

  centerDataFont: (props: StyleProps) => ({
    width: props.width,
    fontStyle: "normal",
    fontFamily: "Ubuntu",
    background: "transparent",
    wordWrap: "break-word",
    whiteSpace: "initial",
    textAlign: "center",
    lineHeight: "1.5rem",
    margin: theme.spacing(2, 0),
    alignContent: "flex-start",
  }),
  centerValue: (props: StyleProps) => ({
    maxWidth: props.width,
    fontSize: "2rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
  }),

  centerText: (props: StyleProps) => ({
    maxWidth: props.width,
    fontSize: "1.1rem",
    fontWeight: 300,
    color: theme.palette.text.hint,
    marginTop: theme.spacing(1),
  }),

  centerDataContainer: (props: StyleProps) => ({
    position: "absolute",
    top: props.circleOrient === 1 ? "100%" : "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }),

  centerIcon: (props: StyleProps) => ({
    left: "50%",
    top: props.iconTop
      ? props.iconTop
      : props.circleOrient === 1
      ? props.height -
        props.innerRadius +
        (props.arcWidth * props.outerRadius * 2) / 120
      : props.height / 2 -
        props.innerRadius +
        (props.arcWidth * props.outerRadius * 2) / 120,
    transform: "translate(-50%, -50%)",
    position: "absolute",
    height: props.iconSize,
    width: props.iconSize,
    borderRadius: props.iconSize,
    background: theme.palette.highlight,
    "& img": {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      color: theme.palette.text.secondary,
    },
  }),
  figureWithLegendTable: {
    display: "flex",
  },
}));
export { useStyles };
