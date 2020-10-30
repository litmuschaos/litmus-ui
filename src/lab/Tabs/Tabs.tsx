import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import React from 'react';
import { TabBaseProps } from './base';
import useStyles from './styles';

interface TabsProps extends TabBaseProps {
  label: string[];
  content: any[];
  value: string;
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
}

const Tabs: React.FC<TabsProps> = ({ label, content, onChange, value }) => {
  const classes = useStyles();

  return (
    <TabContext value={value ? value : '0'}>
      <AppBar position="static" className={classes.panel}>
        <TabList
          role="tablist"
          onChange={onChange}
          aria-label="simple tabs example"
          classes={{
            indicator: classes.indicator,
          }}
        >
          {label.map((item, index) => {
            return (
              <Tab
                value={index.toString()}
                key={index}
                label={item}
                className={classes.TabItem}
              />
            );
          })}
        </TabList>
      </AppBar>
      {content.map((item, index) => {
        return (
          <TabPanel key={index} value={index.toString()}>
            {item}
          </TabPanel>
        );
      })}
    </TabContext>
  );
};

export default Tabs;
