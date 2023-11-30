import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as HomeRoutes from "./routes";
import Home from "./Home";
import Preview from "./Preview";

const { Navigator, Screen, Group } = createStackNavigator();

const HomeStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={HomeRoutes.HOME_SCREEN} component={Home} />
      <Screen
        options={{
          presentation: "modal",
        }}
        name={HomeRoutes.PREVIEW_SCREEN}
        component={Preview}
      />
    </Navigator>
  );
};

export default HomeStack;
