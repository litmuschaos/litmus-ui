import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  width?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    width: (props: StyleProps) => props.width || '80%',
    maxHeight: '80%',
    margin: '5rem auto',
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderRadius: 3,
    outline: 'none',
    textAlign: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
  },

  modalActions: {
    position: 'absolute',
    top: '3.33rem',
    right: '3.33rem',
  },
}));

export { useStyles };
