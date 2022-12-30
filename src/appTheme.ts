import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const getDesignModeTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: "hsl(209, 23%, 22%)",
            dark: "hsl(207, 26%, 17%)",
          }
        : {
            main: "hsl(0, 0%, 100%)",
            dark: "hsl(0, 0%, 98%)",
          }),
    },
    background: {
      ...(mode === "dark"
        ? {
            default: "hsl(207, 26%, 17%)",
            paper: "hsl(209, 23%, 22%)",
          }
        : {
            default: "hsl(0, 0%, 98%)",
            paper: "hsl(0, 0%, 100%)",
          }),
    },
    text: {
      ...(mode === "dark"
        ? {
            primary: "hsl(0, 0%, 100%)",
          }
        : {
            primary: "hsl(200, 15%, 8%)",
          }),
    },
  },
});

const appTheme = (mode: PaletteMode) =>
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            ...(mode === "dark"
              ? {
                  backgroundColor: "hsl(207, 26%, 17%)",
                }
              : {
                  backgroundColor: "hsl(0, 0%, 98%)",
                }),
          },
        },
      },
      MuiFilledInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            borderRadius: "4px",
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: KeyboardArrowDownIcon,
        },
      },
    },
    ...getDesignModeTokens(mode),
  });

export default appTheme;
