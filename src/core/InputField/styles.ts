import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '25rem',
    '& label': {
      color: theme.palette.text.hint,
    },
    background: theme.palette.background.paper,
    '& fieldset': {
      borderColor: theme.palette.border.main,
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.hint,
    },
  },
  disabled: {
    color: theme.palette.text.disabled,
    width: '25rem',
    background: theme.palette.background.paper,
    '& fieldset': {
      borderColor: `${theme.palette.border.main} !important`,
      '& legend': {
        width: '3.78125rem !important',
      },
    },
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
