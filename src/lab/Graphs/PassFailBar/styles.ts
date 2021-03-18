import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  width: number;
  height: number;
  barWidth?: number;
  pass?: string;
  fail?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  radialChartRoot: (props: StyleProps) => ({
    width: props.width,
    height: props.height,
    display: "inline-block",
  }),

  radialFont: {
    textAlign: "left",
    fontStyle: "normal",
    fontFamily: "Ubuntu",
  },

  symbol: {
    display: "flex",
    justifyContent: "center",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "1.5rem",
    fontSize: "1.5rem",
    background: "white",
    left: "50%",
    top: "50%",
    lineHeight: "1.5rem",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
  pass: (props: StyleProps) => ({
    width: props.pass,
    background: theme.palette.success.main,
    borderRadius: "0.3rem 0 0 0.3rem",
    height: props.height,
  }),
  fail: (props: StyleProps) => ({
    marginLeft: "0.2rem",
    width: props.fail,
    background: theme.palette.error.main,
    borderRadius: "0 0.3rem 0.3rem 0",
    height: props.height,
  }),
  textValue: {
    display: "flex",
    justifyContent: "space-between",
  },
  colorPass: {
    color: theme.palette.success.main,
  },
  colorFail: {
    color: theme.palette.error.main,
  },
}));
export { useStyles };
