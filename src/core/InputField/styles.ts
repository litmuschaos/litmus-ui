import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  fullWidth?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.primary,
    width: (props: StyleProps) => (props.fullWidth ? '100%' : '25rem'),
    '& label': {
      color: theme.palette.text.hint,
    },
    background: theme.palette.background.paper,
    '& fieldset': {
      borderColor: `${theme.palette.border.main} !important`,
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.hint,
    },
  },
  disabled: {
    color: theme.palette.text.disabled,
    '& label': {
      color: `${theme.palette.border.main} !important`,
    },
  },
  primary: {
    '&:hover': {
      '& fieldset': {
        borderColor: `${theme.palette.highlight} !important`,
      },
    },
  },
  error: {
    background: theme.palette.background.paper,
    color: theme.palette.error.main,
    '& label': {
      color: `${theme.palette.error.main} !important`,
    },
  },
  success: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '& fieldset': {
      borderColor: `${theme.palette.border.success} !important`,
    },
    '& label': {
      color: ` ${theme.palette.success.main} !important`,
    },
  },
}));

export { useStyles };
