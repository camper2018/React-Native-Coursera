import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import {
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./HomeComponent";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Icon } from "react-native-elements";

const CustomDrawerComponent = (props) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
// Using Stack Navigator
const MenuNavigator = createStackNavigator();
function MenuStackScreen({ navigation }) {
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
        options={{
          title: "Menu",
          drawerLabel: "Menu",
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
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
function HomeStackScreen({ navigation }) {
  return (
    <HomeNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 10 }}
          />
        ),
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          drawerLabel: "Home",
        }}
      />
    </HomeNavigator.Navigator>
  );
}
const ContactNavigator = createStackNavigator();
function ContactStackScreen({ navigation }) {
  return (
    <ContactNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 10 }}
          />
        ),
      }}
    >
      <ContactNavigator.Screen
        name="Contact Us"
        component={Contact}
        options={{
          title: "Contact Us",
          drawerLabel: "Contact Us",
        }}
      />
    </ContactNavigator.Navigator>
  );
}
const AboutNavigator = createStackNavigator();
function AboutStackScreen({ navigation }) {
  return (
    <AboutNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 10 }}
          />
        ),
      }}
    >
      <AboutNavigator.Screen
        name="About Us"
        component={About}
        options={{
          title: "About Us",
          drawerLabel: "About Us",
        }}
      />
    </AboutNavigator.Navigator>
  );
}
// Using Drawer-Based Navigation

const MainNavigator = createDrawerNavigator();
function MainDrawerScreen() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Home"
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
      // DrawerContent={CustomDrawerContentComponent}
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
    >
      <MainNavigator.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Menu"
        component={MenuStackScreen}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Contact Us"
        component={ContactStackScreen}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="About Us"
        component={AboutStackScreen}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});
export default Main;
