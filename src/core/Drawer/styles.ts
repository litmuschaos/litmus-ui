import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  anchor: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  content: {
    padding: "1rem",
    width: (props: StyleProps) =>
      props.anchor === "top" || props.anchor === "bottom"
        ? "100%"
        : "fit-content",
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    textAlign: "center",
  },

  modalActions: {},
}));

export { useStyles };
