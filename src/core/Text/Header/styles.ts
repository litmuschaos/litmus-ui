import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '3rem',
    color: (props: StyleProps) =>
      props ? props.color : theme.palette.text.primary,
  },
  primary: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  small: {
    fontSize: '2rem',
  },
}));

export { useStyles };
