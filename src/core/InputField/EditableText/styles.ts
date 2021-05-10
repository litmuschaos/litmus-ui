import { makeStyles } from "@material-ui/core";

interface StyleProps {
  editing: boolean;
  value: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInput-underline:before": {
      display: "none",
    },

    "& .MuiFormLabel-root": {
      display: "none",
    },
    "& .Mui-focused": {
      display: "block",
    },

    "& input": {
      width: ({ value }: StyleProps) => `calc(${value.length} * 1.05ch)`,
      "&:focus, &:hover, &:active": {
        "&:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
          WebkitTextFillColor: theme.palette.text.primary,
        },
      },
      "&:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },
  },
  editButton: {
    padding: 0,
  },
}));

export { useStyles };
