import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keybaordAvoidingView}
          keyboardVerticalOffset={20}
          behavior={Platform.select({ ios: "padding", android: "height" })}
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  keybaordAvoidingView: {
    flex: 1,
  },
});
