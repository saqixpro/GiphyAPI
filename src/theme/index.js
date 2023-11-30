import { Dimensions } from "react-native";

const Colors = {
  text: "#1f1f1f",
  white: "#ffffff",
  black: "#000000",
  accent: "#007aff",
  gray: "#8e8e8f",
};

const Frame = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const theme = {
  Colors,
  Frame,
};
