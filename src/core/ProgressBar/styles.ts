import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: StyleProps) => ({
    width: '12.125rem',
    borderRadius: '0.125rem',
    background: theme.palette.disabledBackground,
    '& .MuiLinearProgress-bar': {
      backgroundColor: props.color,
    },
  }),
  label: {
    fontSize: '0.875rem',
    marginBottom: theme.spacing(1.625),
    display: 'flex',
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    '& hr': {
      width: '0.75rem',
      height: '0.0625rem',
      border: `0.0625rem solid ${theme.palette.disabledBackground}`,
      borderRadius: '0.3125rem',
      margin: `${theme.spacing(1.25, 1)} auto`,
    },
  },
  value: (props: StyleProps) => ({
    color: props.color,
    fontWeight: 500,
    fontSize: '1rem',
  }),
}));
export { useStyles };
