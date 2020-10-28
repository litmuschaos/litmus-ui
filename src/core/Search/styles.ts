import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '10.18rem',
    color: theme.palette.text.hint,
    '&:before': {
      borderBottom: `0.0625rem solid ${theme.palette.border.main}`,
    },
    '& input': {
      '&:focus': {
        color: theme.palette.text.primary,
        borderColor: theme.palette.highlight,
      },
    },
  },
}));

export { useStyles };
