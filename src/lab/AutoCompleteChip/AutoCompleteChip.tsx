// import AutocompleteProps from "@material-ui/core/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
// import SuccessIcon from "../../assets/crossIcon.svg";
import { useStyles } from "./style";

export interface Option {
  name: string;
  [index: string]: any;
}

// TODO update interface after material-ui core updte
export interface AutoCompleteChipProps {
  variant: "outlined" | "filled" | "standard" | undefined;
  label: string;
  placeholder: string;
  onChange: () => void;
  className?: string;
  optionList: Array<Option>;
}

const AutoCompleteChip: React.FC<AutoCompleteChipProps> = ({
  variant = "outlined",
  label = "checkboxes",
  placeholder = "selections",
  onChange,
  optionList,
  className,
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
      className={`${classes.root} ${className}`}
      multiple
      options={optionList}
      disableCloseOnSelect
      ChipProps={chips}
      onChange={onChange}
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <div>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              className={classes.checkbox}
              checked={selected}
            />
            {option.name}
          </div>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          className={classes.textField}
          {...params}
          variant={variant}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export { AutoCompleteChip };
