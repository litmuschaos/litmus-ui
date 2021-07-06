import { makeStyles } from "@material-ui/core";
interface StyleProps {
  fill?: string;
  stroke?: string;
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
      fill: props.fill,
    },
  }),
}));

export { useStyles };
