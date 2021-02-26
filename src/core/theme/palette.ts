const white = "#FFFFFF";
const black = "#000000";

const palette = (type: "dark" | "light" | undefined) => {
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
