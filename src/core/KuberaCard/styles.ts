import { fade, makeStyles } from '@material-ui/core';

interface StyleProps {
  glow: boolean;
  height: string;
  width: string;
}

const useStyles = makeStyles((theme) => ({
  root: (props: StyleProps) => ({
    background: theme.palette.background.paper,
    border: props.glow
      ? `1px solid ${theme.palette.highlight}`
      : `1px solid ${theme.palette.border.main}`,
    boxShadow: props.glow
      ? `0px 3px 5px -1px ${fade(
          theme.palette.highlight,
          0.14
        )},0px 6px 10px 0px ${fade(
          theme.palette.highlight,
          0.14
        )},0px 1px 18px 0px ${fade(theme.palette.highlight, 0.14)}`
      : '',
    width: props.width,
    height: props.height,
    borderRadius: 10,
  }),
}));

export { useStyles };
