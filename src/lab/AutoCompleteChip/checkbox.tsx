import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import React from "react";

const UnselectedIcon = () => (
  <CheckBoxOutlineBlankIcon fontSize="small" style={{ color: "purple" }} />
);
const SelectedIcon = (
  <CheckBoxIcon fontSize="small" style={{ color: "purple" }} />
);

export { UnselectedIcon, SelectedIcon };
