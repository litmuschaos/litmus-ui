import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { BaseAutocompleteChipInputProps } from "./base";
import { useStyles } from "./style";

const AutoCompleteChip: React.FC<BaseAutocompleteChipInputProps> = ({
  variant = "outlined",
  label = "checkboxes",
  placeholder = "selections",
  options = [],
  className,
  multiple = true,
  disableClearable = true,
  ...rest
}) => {
  const classes = useStyles();

  const icon = (
    <CheckBoxOutlineBlankIcon fontSize="small" className={classes.checkbox} />
  );
  const checkedIcon = (
    <CheckBoxIcon fontSize="small" className={classes.checkbox} />
  );
  const chips = {
    variant: "outlined",
    size: "medium",
    className: classes.chip,
  };
  return (
    <Autocomplete
      data-testid="autocomplete"
      className={`${classes.root} ${className}`}
      ChipProps={chips}
      multiple={multiple}
      disableClearable={disableClearable}
      options={options}
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <div>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              disableRipple
              className={classes.checkbox}
              checked={selected}
            />
            {option.name}
          </div>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          data-testid="textfield"
          className={classes.textField}
          {...params}
          variant={variant}
          label={label}
          placeholder={placeholder}
        />
      )}
      {...rest}
    />
  );
};

export { AutoCompleteChip };
