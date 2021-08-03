import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.5, 0.75),
    borderRadius: "0.125rem",
    fontSize: "0.625rem",
    fontWeight: 400,
    textTransform: "none",
    "& .MuiChip-icon": {
      marginLeft: 0,
    },
    "& .MuiChip-label": {
      padding: theme.spacing(0, 0, 0, 1.25),
    },
  },
  variant: (props: StyleProps) => ({
    color: props.color,
    border: `0.025rem solid  ${props.color}`,
  }),
}));

export { useStyles };
