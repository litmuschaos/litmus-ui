import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    stroke: theme.palette.border.main,
    strokeOpacity: 1,
  },
}));

export { useStyles };
