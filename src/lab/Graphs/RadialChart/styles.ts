import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  rectBase: {
    fill: 'rgba(10, 24, 24, 0.9)',
  },
  radicalArc: {
    opacity: 0.9,
    transform: 'scale(1)',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.02)',
    },
  },
  centerDataValue: {
    fontFamily: 'Ubuntu',
    fontSize: '3rem',
    fontStyle: 'normal',
    fontWeight: 500,
    textAlign: 'left',
    fill: 'white',
  },
}));
export { useStyles };
