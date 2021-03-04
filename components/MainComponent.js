import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./HomeComponent";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Using Stack Navigator
const MenuNavigator = createStackNavigator();
function MenuStackScreen() {
  return (
    <MenuNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={{ title: "Menu", drawerLabel: "Menu" }}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ title: "Dish Detail" }}
      />
    </MenuNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", drawerLabel: "Home" }}
      />
    </HomeNavigator.Navigator>
  );
}
// Using Drawer-Based Navigation

const MainNavigator = createDrawerNavigator();
function MainDrawerScreen() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Home"
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
    >
      <MainNavigator.Screen name="Home" component={HomeStackScreen} />
      <MainNavigator.Screen name="Menu" component={MenuStackScreen} />
    </MainNavigator.Navigator>
  );
}
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
        <MainDrawerScreen />
      </NavigationContainer>
    );
  }
}

export default Main;
