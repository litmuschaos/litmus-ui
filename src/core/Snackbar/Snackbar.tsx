import { Snackbar as MuiSnackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { SnackbarProps as SnackbarBaseProps } from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useStyles } from "./styles";

type Variant = "success" | "warning" | "error" | undefined;

export interface SnackbarProps extends SnackbarBaseProps {
  variant?: Variant;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Snackbar: React.FC<SnackbarProps> = ({
  variant,
  children,
  className,
  setOpen,
  open,
  message,
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
    setOpen(false);
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
      autoHideDuration={2000}
      action={
        <>
          <IconButton className={classes.IconButton} onClick={handleClose}>
            <CloseIcon fontSize="small" />
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
