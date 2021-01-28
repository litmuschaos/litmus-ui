import { makeStyles, Theme } from '@material-ui/core';

interface StyleProps {
  width?: number;
  height?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: StyleProps) => ({
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
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    border: 'none',
    margin: 'none',
    width: '100%',
  },
  tableCell: {
    display: 'flex',
    border: 'none',
    margin: 'none',
    alignContent: 'flex-start',
    padding: theme.spacing(1, 0),
  },

  tableHeading: {
    display: 'flex',
    border: 'none',
    margin: '0',
    justifyContent: 'space-between',
    color: theme.graph.dashboard.lightBlue,
    width: '4rem',
    '&:first-child': {
      maxWidth: '14rem',
      minWidth: '4rem',
    },
  },
  tableLabel: {
    maxWidth: '14rem',
    minWidth: '4rem',
  },
  tableData: {
    width: '4rem',
    '& span': {
      alignContent: 'flex-start',
    },
  },
  tableFont: {
    wordWrap: 'break-word',
    whiteSpace: 'initial',
    alignContent: 'flex-start',
    color: theme.palette.text.primary,
  },
  hr: {
    position: 'relative',
    width: '1rem',
    height: '0.2rem',
    alignSelf: 'baseline',
    marginRight: '0.5em',
    marginTop: '0.5rem',
  },
}));

export { useStyles };
