import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  fullWidth?: boolean;
  width?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.primary,
    width: (props: StyleProps) => (props.fullWidth ? "100%" : props.width),
    "& label": {
      color: theme.palette.text.hint,
    },
    "& .MuiInputBase-root": {
      background: theme.palette.background.paper,
    },
    "& fieldset": {
      borderColor: `${theme.palette.border.main} !important`,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.hint,
    },

    "& input": {
      background: theme.palette.background.paper,
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
  disabled: {
    color: theme.palette.text.disabled,
    "& label": {
      color: `${theme.palette.border.main} !important`,
    },
  },
  primary: {
    "&:hover": {
      "& fieldset": {
        borderColor: `${theme.palette.highlight} !important`,
      },
    },
    "& .MuiInputBase-root:after": {
      borderColor: `${theme.palette.border.main} !important`,
    },
  },
  error: {
    background: theme.palette.background.paper,
    "& fieldset": {
      borderColor: `${theme.palette.border.error} !important`,
    },
    "& label": {
      color: `${theme.palette.error.main} !important`,
    },
  },
  success: {
    background: theme.palette.background.paper,
    "& fieldset": {
      borderColor: `${theme.palette.border.success} !important`,
    },
    "& label": {
      color: ` ${theme.palette.success.main} !important`,
    },
    "& .MuiInputBase-root:after": {
      borderColor: `${theme.palette.border.success} !important`,
    },
  },
}));

export { useStyles };
