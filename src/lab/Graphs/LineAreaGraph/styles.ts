import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  width?: number;
  height?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  rectBase: {
    fill: theme.palette.background.paper,
  },
  table: (props: StyleProps) => ({
    display: 'flex',
    width: props.width,
    height: props.height,
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '3px',
      height: '3px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '3px',
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: theme.palette.background.paper,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.highlight,
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.palette.highlight,
    },
  }),

  tableDataRow: {
    float: 'left',
    display: 'flex',
    alignItems: 'flex-start',
  },
  tableFont: {
    fontFamily: 'Ubuntu',
    fontSize: '0.8rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
    borderBottom: 'none',
    letterSpacing: '0em',
    paddingLeft: '0.5em',
    textAlign: 'left',
    minWidth: '4rem',
  },

  tableHeading: {
    paddingLeft: '1.5em',
    fontSize: '0.9rem',
    color: theme.graph.legendTableHeading,
    whiteSpace: 'nowrap',
    fontWeight: 500,
  },

  hr: {
    width: '12px',
    height: '2px',
  },
  grid: {
    stroke: theme.palette.disabledBackground,
    strokeOpacity: 0.2,
  },
  tooltipLine: {
    stroke: theme.graph.toolTip,
    strokeWidth: 4,
    pointerEvents: 'none',
  },
  tooltipMetric: {
    marginTop: '1rem',
    marginLeft: '3rem',
    padding: '0.5rem',
    backgroundColor: `${theme.palette.cards.background} !important`,
  },
  tooltipDateStyles: {
    position: 'relative',
    transform: 'translate(30%,0)',
    marginTop: '0.3rem',
    backgroundColor: `${theme.graph.toolTip} !important`,
    padding: '0.5rem',
  },
  tooltipData: {
    display: 'flex',
    color: theme.palette.text.primary,
    justifyContent: 'space-between',
    padding: '0.2rem',
    '& span': {
      paddingLeft: '0.5em',
      maxWidth: '20rem',
      lineHeight: '1rem',
    },
  },
  tooltipLabel: {
    display: 'flex',
  },
  tooltipValue: {
    paddingLeft: '0.2rem',
  },
}));

export { useStyles };
