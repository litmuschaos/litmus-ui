import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '1rem',
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
    fontSize: '0.75rem',
    fontWeight: 'normal',
  },
}));

export { useStyles };
