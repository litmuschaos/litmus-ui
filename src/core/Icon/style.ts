import { makeStyles } from "@material-ui/core";
interface StyleProps {
  color?: string;
  rectFill?: boolean;
  rectStroke?: boolean;
  pathStroke?: boolean;
}
const useStyles = makeStyles(() => ({
  container: {
    display: "inline-block",
  },
  icon: (props: StyleProps) => ({
    verticalAlign: "middle",
    display: "inline-block",
    // Override color based on the color
    // passed by the user
    "& path": {
      stroke: props.pathStroke ? props.color : "",
      fill: props.rectFill ? "" : props.pathStroke ? "" : props.color,
    },
    "& rect": {
      fill: props.rectFill ? props.color : "",
      stroke: props.rectStroke ? props.color : "",
    },
  }),
}));

export { useStyles };
