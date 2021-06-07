import { Snackbar as MuiSnackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { SnackbarProps as SnackbarBaseProps } from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useStyles } from "./styles";

type Variant = "success" | "warning" | "error" | undefined;

export interface SnackbarProps extends SnackbarBaseProps {
  variant?: Variant;
}

const Snackbar: React.FC<SnackbarProps> = ({
  variant,
  children,
  className,
  open,
  onClose,
  message,
  ...rest
}) => {
  // Styles
  const classes = useStyles();

  function getVariant(variant: Variant): string {
    switch (variant) {
      case "success":
        return classes.success;
      case "warning":
        return classes.warning;
      case "error":
        return classes.error;
      default:
        return "";
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
      onClose={onClose}
      autoHideDuration={2000}
      action={
        <>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      className={`${classes.root} ${className} ${getVariant(variant)}`}
      {...rest}
    >
      {children}
    </MuiSnackbar>
  );
};

export { Snackbar };
