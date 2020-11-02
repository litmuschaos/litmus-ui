import { Button, Modal as MuiModal } from '@material-ui/core';
import React from 'react';
import { ModalBaseProps } from './base';
import useStyles from './styles';

interface ModalProps extends ModalBaseProps {
  hasCloseBtn: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  hasCloseBtn,
  open,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      disableBackdropClick
      disableEscapeKeyDown
      title="Modal"
      aria-labelledby="simple-modal-title"
    >
      <div className={classes.root}>
        {hasCloseBtn && (
          <Button
            variant="outlined"
            className={classes.closeButton}
            onClick={() => onClose}
          >
            &#x2715;
          </Button>
        )}
        {children}
      </div>
    </MuiModal>
  );
};

export { Modal };
