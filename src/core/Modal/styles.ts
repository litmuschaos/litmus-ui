import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  width?: string;
  height?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "15px",
  },
  content: {
    position: "relative",
    width: (props: StyleProps) => props.width ?? "80%",
    height: (props: StyleProps) => props.height ?? "80%",
    margin: "5rem auto",
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderRadius: 3,
    outline: "none",
    textAlign: "center",
    overflowX: "hidden",
    overflowY: "auto",
  },

  modalActions: {
    position: "absolute",
    top: "2.5rem",
    right: "2.5rem",
  },
}));

export { useStyles };
