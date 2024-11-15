import { createTheme } from "@mui/material/styles";
import { typographyOverrides } from "./overrides/typography";
import { paletteOverrides } from "./overrides/palette";
import { componentsOverrides } from "./overrides/components";

const breakPointsOptions = {
  values: {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1280
  }
};

export const muiTheme = createTheme({
  breakpoints: breakPointsOptions,
  typography: typographyOverrides,
  palette: paletteOverrides,

  components: componentsOverrides
});
