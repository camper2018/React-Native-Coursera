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
  ToastAndroid,
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
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import NetInfo from "@react-native-community/netinfo";
// import Toast from "react-native-simple-toast";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});
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
const ReservationNavigator = createStackNavigator();
function ReservationStackScreen({ navigation }) {
  return (
    <ReservationNavigator.Navigator
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
      <ReservationNavigator.Screen
        name="Reserve Table"
        component={Reservation}
        options={{
          title: "Reserve Table",
          drawerLabel: "Reserve Table",
        }}
      />
    </ReservationNavigator.Navigator>
  );
}

const FavoritesNavigator = createStackNavigator();
function FavoritesStackScreen({ navigation }) {
  return (
    <FavoritesNavigator.Navigator
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
      <FavoritesNavigator.Screen
        name="My Favorites"
        component={Favorites}
        options={{
          title: "My Favorites",
          drawerLabel: "My Favorites",
        }}
      />
    </FavoritesNavigator.Navigator>
  );
}
const LoginNavigator = createStackNavigator();
function LoginStackScreen({ navigation }) {
  return (
    <LoginNavigator.Navigator
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
      <LoginNavigator.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          drawerLabel: "Login",
        }}
      />
    </LoginNavigator.Navigator>
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
        name="Login"
        component={LoginStackScreen}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
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
      <MainNavigator.Screen
        name="My Favorites"
        component={FavoritesStackScreen}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Reserve Table"
        component={ReservationStackScreen}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="cutlery"
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
  constructor(props) {
    super(props);
    this.state = {
      // type: "",
      // isConnected: false,
    };
  }
  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case "none":
        console.log("You are now offline!");
        ToastAndroid.show("You are now offline!", ToastAndroid.LONG);
        break;
      case "wifi":
        console.log("You are now connected to WiFi!");
        ToastAndroid.show("You are now connected to WiFi!", ToastAndroid.LONG);
        break;
      case "cellular":
        console.log("You are now connected to Cellular!");
        ToastAndroid.show(
          "You are now connected to Cellular!",
          ToastAndroid.LONG
        );
        break;
      case "unknown":
        console.log("You now have unknown connection!");
        ToastAndroid.show(
          "You now have unknown connection!",
          ToastAndroid.LONG
        );
        break;
      case "other":
        console.log("You now have other connection!");
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      console.log(`Initial Network Connectivity Type: ${state.type}`);
      console.log(JSON.stringify(state.details));
      ToastAndroid.show(
        "Initial Network Connectivity Type: " +
          state.type +
          ", effectiveType: " +
          state.details,
        ToastAndroid.LONG
      );
    });
    //Subscribing to network updates

    this.netinfoUnsubscribe = NetInfo.addEventListener((state) =>
      this.handleConnectivityChange(state)
    );
  }
  //Unsubscribing to updates
  componentWillUnmount() {
    this.netinfoUnsubscribe();
  }

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
export default connect(mapStateToProps, mapDispatchToProps)(Main);
