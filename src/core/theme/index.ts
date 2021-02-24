import { createMuiTheme } from "@material-ui/core";
import palette from "./palette";
import overrides from "./overrides";

const theme = (type: string) => {
  return createMuiTheme({
    overrides,
    palette: palette(type),
  });
};

export default theme;
