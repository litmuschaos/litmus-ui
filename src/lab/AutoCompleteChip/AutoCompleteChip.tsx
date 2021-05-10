import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import SuccessIcon from "../../assets/crossIcon.svg";
import { useStyles } from "./style";
import { top100Films } from "./testData";

const ASuccess = () => {
  return <img src={SuccessIcon} alt="white check mark" />;
};
const handleDelete = () => {
  console.log("You clicked the delete icon.");
};

const AutoCompleteChip = () => {
  const classes = useStyles();

  const icon = (
    <CheckBoxOutlineBlankIcon fontSize="small" className={classes.checkbox} />
  );
  const checkedIcon = (
    <CheckBoxIcon fontSize="small" className={classes.checkbox} />
  );
  const chipss = {
    variant: "outlined",
    size: "medium",
    // onMouseDown: (e: any) => {
    //   console.log("h");
    //   e.stopPropagation();
    // },
    // deleteIcon: <ASuccess />,
    // onDelete: { handleDelete },
    // onClick: { handleDelete },
    className: classes.chip,
  };
  const [selectedOptions, setSelectedOptions] = useState<any>();
  console.log(selectedOptions);
  return (
    <Autocomplete
      className={classes.root}
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      ChipProps={chipss}
      onChange={(event, value) => setSelectedOptions(value)}
      getOptionLabel={(option) => option.title}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <div>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              className={classes.checkbox}
              style={{ border: "red", marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </div>
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          className={classes.textField}
          {...params}
          variant="outlined"
          label="Checkboxes"
          placeholder="Favorites"
        />
      )}
    />
  );
};

export { AutoCompleteChip };
