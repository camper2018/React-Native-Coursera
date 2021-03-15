import React, { Component } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Card, Icon, Input, CheckBox } from "react-native-elements";
// import { SecureStore } from "expo";
import * as SecureStore from "expo-secure-store";
class Login extends Component {
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
      // console.log("userdata: ", userdata);
      // the user data I have to convert it into a JSON string before I store it in the store
      // and when I retrieve, I will get back the JSON string, so I will have to parse the JSON string and convert it into a JavaScript object.
      let user = JSON.parse(userdata);
      // userinfo not null
      if (user) {
        // console.log("user: ", user);
        this.setState({ username: user.username });
        this.setState({ password: user.password });
        // the reason I'm setting the remember to true is because previously,
        // the user had saved the username and password to the secure store.
        // So that's why I'm setting remember to true, so that I will remember to save any changes if the user makes to this also back to the store.
        this.setState({ remember: true });
      }
    });
  }
  static navigationOptions = {
    title: "Login",
  };
  async handleLogin() {
    // console.log(JSON.stringify(this.state));
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
            color="white"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 40,
  },
  formInput: {
    width: 300,
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null,
  },
  formButton: {
    margin: 40,
    backgroundColor: "#512DA8",
  },
});
export default Login;
