import { createTheme } from "./base";

const wiproIAssureTheme = createTheme({
  palette: {
    primary: {
      main: "#0E3570",
      light: "#1961CC",
      dark: "#082044",
    },
    secondary: {
      main: "#0069FF",
      light: "#0054CC",
      dark: "#0D0099",
    },
    graph: {
      dashboard: {
        lightBlue: "#08BBD7",
        lightOrange: "#F6B92B",
      },
      toolTip: "#5252F6",
      legendTableHeading: "#0098DD",
      radialChartPassed: "#00C29F",
      line: {
        violet: "#5B44BA",
        violetLight: "#7C6AC8",
        brightPink: "#D45087",
        darkPink: "#CC556A",
        yellow: "#FFA600",
        darkYellow: "#DFA73E",
        orange: "#F6793E",
        green: "#2DA660",
        lightGreen: "#6DA966",
        lightBlue: "#51C9DA",
        darkBlue: "#2F4B7C",
        grey: "#5D6173",
      },
      area: {
        violet: "#5B44BA73",
        violetLight: "#7C6AC873",
        brightPink: "#A4508773",
        darkPink: "#CC556A73",
        yellow: " #FFA60073",
        darkYellow: "#DFA73E73",
        orange: "#F6793E73",
        lightGreen: "#6DA96673",
        lightBlue: "#51C9DA73",
        darkBlue: "#2F4B7C73",
        grey: "#5D617373",
      },
    },
    success: {
      main: "#00C29F",
      light: "#00C29F20",
      dark: "#008F75",
    },
    error: {
      main: "#ED4F32",
      light: "#EF334110",
      dark: "#AF0E1A",
    },
    warning: {
      main: "#DBA017",
      light: "#F6B92B33",
      dark: "#402C01",
    },
    background: {
      default: "#F8F7FC",
      paper: "#FFFFFF",
    },
    sidebarMenu: "#EEEDF3",
    loginBackground: "#FFFFFF",
    disabledBackground: "#DEDEF5",
    text: {
      primary: "#1E1D25",
      secondary: "#FFFFFF",
      disabled: "#00000061",
      hint: "#676767",
    },
    highlight: "#0069FF",
    horizontalStepper: {
      completed: "#5D6173",
      active: "#0069FF",
      pending: "#B9B9B9",
    },
    border: {
      main: "#BFBFBF",
      success: "#109B67",
      error: "#ED4F32",
    },
    progressBarGradient:
      "linear-gradient(90.43deg, #0E3570 0.35%, #0069FF 51.03%, #00C29F 99.64%);",
    status: {
      running: {
        text: "#0069FF",
        background: "#F6B92B33",
      },
      completed: {
        text: "#109B67",
        background: "#109B6733",
      },
      pending: {
        text: "#B9B9B9",
        background: "#B9B9B94D",
      },
      failed: {
        text: "#CA2C2C",
        background: "#CA2C2C33",
      },
    },
    cards: {
      header: "#F3F2F7",
      background: "#FFFFFF",
      highlight: "#109B6710",
    },
  },
});

export { wiproIAssureTheme };
