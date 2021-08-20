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
  baseColor?: string;
  centerText?: string;
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
    top: props.outerRadius,
    left: "50%",
    // Depending on whether the centerText is defined or not
    // the centerValue and centerText are aligned
    transform: props.centerText
      ? "translate(-50%, -50%)"
      : props.circleOrient === 1
      ? "translate(-50%, -100%)"
      : "translate(-50%, -50%)",
  }),

  centerIcon: (props: StyleProps) => ({
    // Left of the icon is always 50% of the width
    left: "50%",
    // The top of the icon is assigned iconTop as passed by
    // the user
    // if the user doesn't passes the iconTop then a rough
    // calculation based on the height
    // radius of the arc and its width is performed
    top: props.iconTop
      ? props.iconTop // iconTop as per props sent by user
      : props.circleOrient === 1 // rough estimation
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
    background: props.baseColor ?? theme.palette.highlight,
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
