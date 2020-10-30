import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  panel: {
    width: '100%',
    boxShadow: 'none',
    background: 'transparent',
    borderBottom: `0.0625rem solid ${theme.palette.border.main}`,
  },

  indicator: {
    background: theme.palette.highlight,
    boxShadow: theme.shadows[4],
  },

  TabItem: {
    fontWeight: 500,
    color: theme.palette.text.hint,
    fontSize: '1rem',
    lineHeight: '140%',
    textAlign: 'center',
    textTransform: 'none',
  },
  '&.MuiTab-textColorInherit&.Mui-selected': {
    color: theme.palette.highlight,
  },
}));

export default useStyles;
