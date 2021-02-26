import { createMuiTheme } from "@material-ui/core";
import palette from "./palette";
import overrides from "./overrides";

type Type = "dark" | "light" | undefined;

const theme = (type: Type) => {
  return createMuiTheme({
    overrides,
    palette: palette(type),
  });
};

export default theme;
