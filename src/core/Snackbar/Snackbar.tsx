import {
  IconButton,
  Snackbar as MuiSnackbar,
  SnackbarProps as SnackbarBaseProps,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./styles";

type Variant = "success" | "warning" | "error" | undefined;

export interface SnackbarProps extends SnackbarBaseProps {
  variant?: Variant;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Snackbar: React.FC<SnackbarProps> = ({
  variant,
  children,
  className,
  setOpen,
  open,
  message,
  autoHideDuration = 2000,
  ...rest
}) => {
  // Styles
  const classes = useStyles();

  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen?.(false);
  };

  function getVariant(variant: Variant): string {
    switch (variant) {
      case "success":
        return classes.success;
      case "warning":
        return classes.warning;
      case "error":
        return classes.error;
      default:
        return classes.default;
    }
  }

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      message={message}
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      action={
        <>
          <IconButton className={classes.IconButton} onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        </>
      }
      className={`${className} ${getVariant(variant)}`}
      {...rest}
    >
      {children}
    </MuiSnackbar>
  );
};

export { Snackbar };
