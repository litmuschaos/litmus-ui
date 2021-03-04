import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    stroke: theme.palette.disabledBackground,
    strokeOpacity: 0.2,
  },
}));

export { useStyles };
