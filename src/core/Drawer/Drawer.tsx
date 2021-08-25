import { Drawer as MuiDrawer, IconButton } from "@material-ui/core";
import React from "react";
import { Icon, IconName } from "../Icon";
import { DrawerBaseProps } from "./base";
import { useStyles } from "./styles";

interface DrawerProps extends DrawerBaseProps {
  onButtonClose: () => void;
  icon: IconName;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  anchor = "right",
  icon = "close",
  className,
  onButtonClose,
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
          onClick={onButtonClose}
          component="span"
        >
          <Icon name={icon} />
        </IconButton>
        <div data-testid="drawer-items">{children}</div>
      </div>
    </MuiDrawer>
  );
};

export { Drawer };
