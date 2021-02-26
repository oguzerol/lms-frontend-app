const white = "#FFFFFF";
const black = "#000000";

type Type = "dark" | "light" | undefined;

const palette = (type: Type) => {
  if (type === "dark") {
    return {
      type,
      black,
      white,
      primary: {
        main: "#9D9898",
      },
      secondary: {
        main: "#B21C1A",
        contrastText: "#fff",
      },
    };
  } else {
    return {
      type,
      black,
      white,
      primary: {
        main: "#413D3D",
      },
      secondary: {
        main: "#B21C1A",
        contrastText: "#fff",
      },
    };
  }
};

export default palette;
