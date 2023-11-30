import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import MainNavigator from "./src/screens";
import { useFonts } from "expo-font";
import { theme } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/Fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/Fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/Fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.Colors.accent} />
      </View>
    );

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
