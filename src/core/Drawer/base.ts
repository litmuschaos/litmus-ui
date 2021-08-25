import { DrawerProps } from "@material-ui/core";

export type DrawerBaseProps = Omit<
  DrawerProps,
  "transitionDuration" | "variant" | "PaperProps" | "SlideProps" | "ModalProps"
>;
