import { Drawer as MuiDrawer, IconButton } from "@material-ui/core";
import React from "react";
import { Icon } from "../Icon";
import { DrawerBaseProps } from "./base";
import { useStyles } from "./styles";

interface DrawerProps extends DrawerBaseProps {
  onCloseButton: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  anchor = "right",
  className,
  onCloseButton,
  ...rest
}) => {
  const classes = useStyles({ anchor });

  return (
    <MuiDrawer
      anchor={anchor}
      className={`${classes.root} ${className}`}
      {...rest}
    >
      <div className={classes.content}>
        <IconButton
          data-testid="close-btn"
          className={classes.closeIcon}
          onClick={onCloseButton}
          component="span"
        >
          <Icon name="close" />
        </IconButton>
        <div data-testid="drawer-items">{children}</div>
      </div>
    </MuiDrawer>
  );
};

export { Drawer };
