import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { KuberaThemeProvider, KuberaThemeProviderProps } from '../../theme';
import { Wrapper } from './Wrapper';

interface ThemedBackgroundProps extends KuberaThemeProviderProps {
  row?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: (props: Partial<ThemedBackgroundProps>) =>
      props.row ? 'row' : 'column',
  },
  wrapper: {
    margin: theme.spacing(2),
  },
}));

const ThemedBackground: React.FC<ThemedBackgroundProps> = ({
  platform,
  children,
  row,
}) => {
  const props = { row: row };
  const classes = useStyles(props);

  return (
    <KuberaThemeProvider platform={platform}>
      <Wrapper>
        <div className={classes.root}>
          {children &&
            React.Children.map(children, (child) => (
              <div className={classes.wrapper}>{child}</div>
            ))}
        </div>
      </Wrapper>
    </KuberaThemeProvider>
  );
};

export { ThemedBackground };
