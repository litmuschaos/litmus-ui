import { FormControl, Input, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import React from 'react';
import { BaseSearchProps } from './base';
import { useStyles } from './styles';

const Search: React.FC<BaseSearchProps> = ({ placeholder, onChange }) => {
  // Styles
  const classes = useStyles();

  return (
    <FormControl data-testid="search">
      <Input
        role="Search"
        className={classes.root}
        onChange={onChange}
        id="input-with-icon-adornment"
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export { Search };
