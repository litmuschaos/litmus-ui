import { makeStyles } from "@material-ui/core";
interface StyleProps {
  fill?: string;
  stroke?: string;
  rect?: boolean;
}
const useStyles = makeStyles(() => ({
  container: {
    display: "inline-block",
  },
  icon: (props: StyleProps) => ({
    verticalAlign: "middle",
    display: "inline-block",
    "& path": {
      stroke: props.stroke,
      fill: props.rect ? "white" : props.fill,
    },
    "& rect": {
      fill: props.fill,
    },
  }),
}));

export { useStyles };
