import React, { useMemo } from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { theme } from "../../theme";

export const TextVairants = {
  BOLD: "BOLD",
  NORMAL: "NORAML",
  MEDIUM: "MEDIUM",
};

const Text = ({
  children,
  color = theme.Colors.text,
  size = 14,
  variant,
  align = "left",
  ...props
}) => {
  const familyStyle = useMemo(() => {
    switch (variant) {
      case TextVairants.BOLD:
        return styles.textBold;
      case TextVairants.MEDIUM:
        return styles.textMedium;
      default:
        return styles.text;
    }
  }, [variant]);

  return (
    <RNText style={{ ...familyStyle, textAlign: align, color, fontSize: size }}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins",
  },
  textMedium: {
    fontFamily: "Poppins-Medium",
  },
  textBold: {
    fontFamily: "Poppins-Bold",
  },
});
