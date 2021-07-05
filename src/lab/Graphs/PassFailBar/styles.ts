import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  width: number;
  height: number;
  barWidth?: number;
  pass?: string;
  fail?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  passFailRoot: (props: StyleProps) => ({
    width: props.width,
    height: props.height,
  }),

  singleBar: (props: StyleProps) => ({
    marginRight: theme.spacing(1),
    borderRadius: "0.3rem 0 0 0.3rem",
    height: props.height / 2 - theme.spacing(1.18),
    minWidth: "0.1rem",
    marginTop: theme.spacing(1),
  }),

  passBar: (props: StyleProps) => ({
    width: props.pass,
    background: theme.palette.success.main,
  }),
  failBar: (props: StyleProps) => ({
    width: props.fail,
    background: theme.palette.error.main,
  }),
  barAndText: {
    display: "flex",
  },
  text: {
    top: "50%",
    transform: "translate(0%, 25%)",
    fontStyle: "normal",
    fontFamily: "Ubuntu",
  },
  passText: {
    color: theme.palette.success.main,
  },
  failText: {
    color: theme.palette.error.main,
  },
}));
export { useStyles };
