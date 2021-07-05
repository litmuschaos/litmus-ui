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
      borderColor: `${theme.palette.border.main}`,
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

  // Styles for disabled input field
  disabled: {
    color: theme.palette.text.disabled,
    "& label": {
      color: `${theme.palette.border.main} !important`,
    },
  },

  // Styles for filled input component
  filled: {
    "& .MuiFilledInput-root": {
      border: `1px solid ${theme.palette.border.main}`,
      borderRadius: 4,
    },
    "& input": {
      borderRadius: 4,
      paddingBottom: 8,
    },
    "& .MuiInputBase-root:before, .MuiInputBase-root:after": {
      border: "none",
    },
    "& label": {
      transform: "translate(14px, 20px) scale(1)",
    },
  },

  // Primary/Default variant
  primary: {
    "&:hover, &:active": {
      "& fieldset": {
        borderColor: `${theme.palette.highlight}`,
      },
    },
  },

  // Error variant
  error: {
    background: theme.palette.background.paper,
    "& fieldset, .MuiFilledInput-root": {
      borderColor: `${theme.palette.border.error} !important`,
    },
  },

  // Success variant
  success: {
    background: theme.palette.background.paper,
    "& fieldset, .MuiFilledInput-root": {
      borderColor: `${theme.palette.border.success} !important`,
    },
    "& label": {
      color: `${theme.palette.success.main} !important`,
    },
    "& svg": {
      "& path": {
        stroke: theme.palette.border.success,
      },
      "& path:last-child": {
        fill: theme.palette.border.success,
      },
    },
  },
}));

export { useStyles };
