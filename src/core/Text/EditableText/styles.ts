import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  fullWidth?: boolean;
  multiline?: boolean;
  width?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: (props: StyleProps) => (props.fullWidth ? '100%' : props.width),
  },
  text: {
    padding: '1.15rem 0 0 0.89rem',
    color: theme.palette.text.primary,
    lineHeight: '1.1876em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: (props: StyleProps) =>
      props.multiline ? 'break-spaces' : 'nowrap',
    overflowWrap: (props: StyleProps) =>
      props.multiline ? 'break-word' : 'normal',
  },
  btn: {
    '& .MuiIconButton-root': {
      alignItems: 'top',
      padding: '1rem 1rem ',
      color: theme.palette.text.primary,
    },
  },
}));

export { useStyles };
