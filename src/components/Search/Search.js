import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme";

const Search = ({ onChangeText, placeholder, ...props }) => {
  const [focused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focused]}>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={(e) => {
          setIsFocused(() => true);
          props.onFocus?.();
        }}
        onBlur={(e) => {
          setIsFocused(() => false);
          props.OnBlur?.();
        }}
        {...props}
        style={styles.input}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          name="search"
          size={20}
          color={focused ? theme.Colors.accent : theme.Colors.gray}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.Colors.white,
    shadowColor: "#00000088",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.Colors.gray,
    padding: 5,
  },
  input: {
    padding: 10,
    flex: 0.9,
    fontFamily: "Poppins",
  },
  iconContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  focused: {
    borderColor: theme.Colors.accent,
    borderWidth: 2,
    shadowOpacity: 0.25,
  },
});
