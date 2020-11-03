import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  styledRadio: {
    '&.MuiRadio-colorSecondary&.Mui-disabled': {
      color: theme.palette.disabledBackground,
    },
    '&.Mui-checked': {
      color: theme.palette.highlight,
    },
    '&.MuiRadio-colorPrimary&.Mui-disabled': {
      color: theme.palette.disabledBackground,
    },
    color: theme.palette.border.main,
    '&.PrivateRadioButtonIcon-checked-13': {
      color: theme.palette.highlight,
    },
    '&.MuiFormControlLabel-label&.Mui-disabled': {
      color: theme.palette.text.disabled,
    },
  },

  root: {
    color: theme.palette.text.primary,
  },
}));

export { useStyles };
