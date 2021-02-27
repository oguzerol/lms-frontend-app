import { createMuiTheme } from "@material-ui/core";
import getPalette from "./palette";
import overrides from "./overrides";

type Type = "dark" | "light" | undefined;

const getTheme = (type: Type) => {
  return createMuiTheme({
    overrides,
    palette: getPalette(type),
  });
};

export default getTheme;
