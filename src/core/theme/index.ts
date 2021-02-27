import { createMuiTheme } from "@material-ui/core";
import getPalette from "./palette";
import overrides from "./overrides";
import { Theme } from "../redux/slices/theme";

const getTheme = (type: Theme) => {
  return createMuiTheme({
    overrides,
    palette: getPalette(type),
  });
};

export default getTheme;
