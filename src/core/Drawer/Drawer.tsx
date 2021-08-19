import { Drawer as MuiDrawer } from "@material-ui/core";
import React from "react";
import { DrawerBaseProps } from "./base";
import { useStyles } from "./styles";

interface DrawerProps extends DrawerBaseProps {
  onClose: () => void;
  modalActions?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  open,
  anchor,
  onClose,
  className,
  modalActions,
  ...rest
}) => {
  const classes = useStyles({ anchor });
  return (
    <MuiDrawer
      anchor={anchor}
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
    </MuiDrawer>
  );
};

export { Drawer };
