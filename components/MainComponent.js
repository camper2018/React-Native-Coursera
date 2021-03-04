import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { NavigationContainer } from "@react-navigation/native";

// Using Stack Navigator
const MenuNavigator = createStackNavigator();

class Main extends Component {
  render() {
    return (
      <NavigationContainer
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : ExpoStatusBar.Constants.statusBarHeight,
        }}
      >
        <MenuNavigator.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerStyle: { backgroundColor: "#512DA8" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "#fff" },
          }}
        >
          <MenuNavigator.Screen
            name="Menu"
            component={Menu}
            // options={{
            //   headerStyle: { backgroundColor: "#512DA8" },
            //   headerTintColor: "#fff",
            //   headerTitleStyle: { color: "#fff" },
            // }}
          />
          <MenuNavigator.Screen
            name="Dishdetail"
            component={Dishdetail}
            options={{ title: "Dish Detail" }}
          />
        </MenuNavigator.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;
