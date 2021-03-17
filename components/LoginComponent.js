import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Icon, Input, CheckBox, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { baseUrl } from "../shared/baseUrl";
import { NavigationContainer } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from "expo-asset";

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
    };
  }
  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let user = JSON.parse(userdata);

      if (user) {
        this.setState({ username: user.username });
        this.setState({ password: user.password });
        this.setState({ remember: true });
      }
    });
  }
  async handleLogin() {
    if (this.state.remember) {
      await SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info ", error));
    } else {
      await SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info ", error)
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={
              <Icon
                name="sign-in"
                type="font-awesome"
                color="white"
                size={24}
              />
            }
            buttonStyle={{ backgroundColor: "#512DA8" }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Register")}
            title=" Register"
            clear
            icon={
              <Icon
                name="user-plus"
                type="font-awesome"
                color="blue"
                size={24}
              />
            }
            titleStyle={{ color: "blue" }}
            buttonStyle={{ backgroundColor: "transparent" }}
          />
        </View>
      </View>
    );
  }
}
class RegisterTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
      imageUrl: baseUrl + "images/logo.png",
    };
    this.processImage = this.processImage.bind(this);
  }
  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
  };
  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info ", error));
    }
  }
  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        // The height of the image will automatically set to 300 to maintain the aspect ratio.
        // So the image will be 400 by 300 pixels by default, because you already adjusted the aspect ratio [4:3] in this get image from camera module where we specified aspect ratio already.
        { resize: { width: 400 } },
      ],
      // when it obtains from the ImagePicker, the ImagePicker gives you the image in JPEG format.
      // So we'll convert that into, PNG format in this image manipulator.
      { format: "png" }
    );
    this.setState({ imageUrl: processedImage.uri });
  };
  getImageFromGallery = async () => {
    const mediaPermission = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    if (mediaPermission.status === "granted") {
      let capturedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
    // ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // }).then((result) => {
    //   if (!result.cancelled) {
    //     this.processImage(result.uri);
    //   }
    // });
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require("./images/logo.png")}
              style={styles.image}
            />
            <Button
              title="Camera"
              onPress={this.getImageFromCamera}
              style={{ margin: 2 }}
            />
            <Button
              title="Gallery"
              onPress={this.getImageFromGallery}
              style={{ margin: 2 }}
            />
          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />

          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  color="white"
                  size={24}
                />
              }
              titleStyle={{ color: "white" }}
              buttonStyle={{ backgroundColor: "#512DA8" }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Tab = createBottomTabNavigator();
function LoginTabScreen({ navigation }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "#9575CD",
        inactiveBackgroundColor: "#D1C4E9",
        activeTintColor: "white",
        inactivetintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginTab}
        options={{
          title: "Login",
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterTab}
        options={{
          title: "Register",
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Login = (props) => {
  return (
    <NavigationContainer independent={true}>
      <LoginTabScreen {...props} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 40,
  },
  formInput: {
    width: 300,
    // margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});
export default Login;
