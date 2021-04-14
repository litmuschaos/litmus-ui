import { makeStyles } from "@material-ui/core";
import { LitmusThemeProvider } from "../src/theme/ThemeProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    position: "relative",
  },
}));

export const decorators = [
  (Story) => {
    const classes = useStyles();
    return (
      <LitmusThemeProvider>
        <div className={classes.root}>
          <Story />
        </div>
      </LitmusThemeProvider>
    );
  },
];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
 