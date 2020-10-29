import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: '0.0.625rem solid',
    width: '25rem',
    borderRadius: '0.25rem',
    '& label': {
      color: theme.palette.text.hint,
      paddingLeft: '1.75rem',
    },
    background: theme.palette.background.paper,
    '& fieldset': {
      borderColor: theme.palette.border.main,
      paddingLeft: '1.5rem !important',
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
      paddingLeft: '1.5rem !important',
      '& legend': {
        width: '3.78125rem !important',
      },
    },
    '& label': {
      color: `${theme.palette.border.main} !important`,
      paddingLeft: '1.75rem',
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
