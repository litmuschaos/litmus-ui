import { IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { InputField } from './../../InputField/InputField';
import { EditableTextBaseProps } from './base';
import { useStyles } from './styles';

interface EditableTextProps extends EditableTextBaseProps {
  width?: string;
  className?: string;
}
const EditableText: React.FC<EditableTextProps> = ({
  value,
  fullWidth,
  multiline,
  width,
  className,
  ...rest
}) => {
  const [toggleEditSave, settoggleEditSave] = React.useState(true);

  const classes = useStyles({ fullWidth, multiline, width: width ?? '25rem' });
  return (
    <div data-testid="editableText">
      <div className={`${classes.root} ${className}`}>
        {toggleEditSave ? (
          <Typography variant="body1" className={classes.text}>
            {value as any}
          </Typography>
        ) : (
          <InputField
            value={value}
            width={width}
            multiline={multiline}
            fullWidth={fullWidth}
            {...rest}
          />
        )}
        <div className={classes.btn}>
          <IconButton
            data-testid="editSave-btn"
            size="medium"
            onClick={() => settoggleEditSave(!toggleEditSave)}
          >
            {toggleEditSave ? (
              <EditIcon data-cy="edit" data-testid="edit-btn" />
            ) : (
              <SaveIcon data-cy="save" data-testid="save-btn" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export { EditableText };
