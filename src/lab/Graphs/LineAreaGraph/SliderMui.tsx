import { Slider, Theme, withStyles } from "@material-ui/core";

const SliderMui = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.highlight,
    height: "0.375rem",
    "& .MuiSlider-mark": {
      display: "none",
    },
  },
  thumb: {
    height: "0.9rem",
    width: "0.9rem",
    backgroundColor: theme.palette.highlight,
    border: `4px double ${theme.palette.background.paper}`,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: "0.375rem",
    borderRadius: "0.3125rem",
  },
  rail: {
    height: "0.375rem",
    borderRadius: "0.3125rem",
  },
  markLabel: {
    '&[data-index="0"]': {
      transform: `translate(0%,0)`,
    },
    '&[data-index="1"]': {
      transform: `translate(-100%,0)`,
    },
  },
}))(Slider);

export { SliderMui };
