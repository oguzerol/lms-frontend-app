import { createMuiTheme } from "@material-ui/core";
import palette from "./palette";

const theme = (type: string) => {
  return createMuiTheme({
    palette: palette(type),
  });
};

export default theme;
