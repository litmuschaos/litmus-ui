import { IconButton, TextField, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { EditableTextBaseProps } from "./base";
import { useStyles } from "./styles";

interface EditableTextProps extends EditableTextBaseProps {
  // default Value should not be empty string
  defaultValue: string;
  onSave: (value: string) => void;
  helperText?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  className,
  defaultValue,
  onSave,
  helperText,
  ...rest
}) => {
  const [value, setValue] = useState<string>(
    defaultValue || "please provide defaultValue"
  );
  const [prevValue, setPrevValue] = useState<string>(value);
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();

  const classes = useStyles({ editing, value });

  const handleFocus = () => {
    setPrevValue(value);
    setEditing(true);
  };

  const handleSave = () => {
    if (prevValue !== value && value !== "") {
      setPrevValue(value);
      onSave(value);
    } else if (value === "") {
      setValue(prevValue);
    }
    setEditing(false);
  };

  return (
    <div>
      <TextField
        data-testid="editable-text"
        inputRef={inputRef}
        className={`${classes.root} ${className}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleSave}
        InputProps={{
          endAdornment: !editing && (
            <IconButton
              data-testid="edit-button"
              className={classes.editButton}
              aria-label="edit icon to edit the text"
              onClick={() => inputRef.current?.focus()}
            >
              <Edit />
            </IconButton>
          ),
        }}
        {...rest}
      />
      {helperText && (
        <Typography className={classes.errorText}>{helperText}</Typography>
      )}
    </div>
  );
};
export { EditableText };
