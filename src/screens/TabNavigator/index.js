import * as Tabs from "./Tabs";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as TabRoutes from "./routes";
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "Poppins",
        },
      }}
      initialRouteName={TabRoutes.HOME_SCREEN}
    >
      <Screen
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "ios-search" : "ios-search-outline"}
              size={24}
              color={color}
            />
          ),
        }}
        name={TabRoutes.SEARCH_SCREEN}
        component={Tabs.Search}
      />
      <Screen
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "ios-home" : "ios-home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
        name={TabRoutes.HOME_SCREEN}
        component={Tabs.HomeStack}
      />
      <Screen
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "ios-star" : "ios-star-outline"}
              size={24}
              color={color}
            />
          ),
        }}
        name={TabRoutes.FAVORITES_SCREEN}
        component={Tabs.Favorites}
      />
    </Navigator>
  );
};

export default TabNavigator;
