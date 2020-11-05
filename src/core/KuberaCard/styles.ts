import { fade, makeStyles } from '@material-ui/core';

interface StyleProps {
  glow?: boolean;
  borderColor: string;
  height: string;
  width: string;
}

const useStyles = makeStyles((theme) => ({
  root: (props: StyleProps) => ({
    background: theme.palette.background.paper,
    border: `1px solid ${props.borderColor}`,
    boxShadow: props.glow
      ? `0px 3px 5px -1px ${fade(
          props.borderColor,
          0.14
        )},0px 6px 10px 0px ${fade(
          props.borderColor,
          0.14
        )},0px 1px 18px 0px ${fade(props.borderColor, 0.14)}`
      : '',
    width: props.width,
    height: props.height,
    borderRadius: 10,
  }),
}));

export { useStyles };
