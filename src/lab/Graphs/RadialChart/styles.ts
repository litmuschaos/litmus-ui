import { makeStyles, Theme } from '@material-ui/core';
interface StyleProps {
  width: number;
  height: number;
  circleOrient?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  rectBase: {
    fill: theme.palette.background.paper,
  },

  radialFont: {
    textAlign: 'left',
    fontStyle: 'normal',
    fontFamily: 'Ubuntu',
  },
  centerDataFont: {
    fontStyle: 'normal',
    fontFamily: 'Ubuntu',
    background: 'transparent',
    wordWrap: 'break-word',
    whiteSpace: 'initial',
    textAlign: 'center',
    lineHeight: '1.5rem',
    margin: theme.spacing(1.5, 0),
    alignContent: 'flex-start',
  },
  centerValue: {
    maxWidth: '8rem',
    minWidth: '6rem',
    fontSize: '2rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },

  centerText: {
    width: '6rem',
    fontSize: '1.2rem',
    fontWeight: 300,
    color: theme.palette.text.hint,
  },

  centerDataContainer: (props: StyleProps) => ({
    top: props.circleOrient === 1 ? props.height : props.height / 2 + 20,
    left: props.width / 2,
    position: 'absolute',
  }),
}));
export { useStyles };
