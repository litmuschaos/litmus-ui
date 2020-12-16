import { Modal as MuiModal } from '@material-ui/core';
import React from 'react';
import { ModalBaseProps } from './base';
import { useStyles } from './styles';

interface ModalProps extends ModalBaseProps {
  width?: string;
  onClose: () => void;
  modalActions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  width,
  open,
  onClose,
  className,
  modalActions,
  ...rest
}) => {
  const classes = useStyles({ width });

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      className={`${classes.root} ${className}`}
      {...rest}
    >
      <div className={classes.content}>
        {modalActions && (
          <div className={classes.modalActions}>{modalActions}</div>
        )}
        {children}
      </div>
    </MuiModal>
  );
};

export { Modal };
