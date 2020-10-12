import { makeStyles } from '@material-ui/core';

const useGlobalStyles = makeStyles(() => ({
  buttonOutline: {
    minWidth: '6.875rem',
    height: '2.8125rem',
    border: '0.0625rem solid',
    textTransform: 'none',
    background: 'transparent',
  },
  valueField: {
    fontSize: '0.75rem',
  },
}));

export default useGlobalStyles;
