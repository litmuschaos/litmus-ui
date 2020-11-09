import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '1.33rem',
    color: (props: StyleProps) =>
      props ? props.color : theme.palette.text.hint,
  },
  primary: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  small: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
}));

export { useStyles };
