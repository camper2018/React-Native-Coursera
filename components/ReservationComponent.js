import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Modal,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-community/picker";
import moment from "moment";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
// We need Permissions from the device platform in order to access the Notification Bar.
// So, we will first ask for Permissions to access the Notification Bar
// and then after that we will be able to put the Notifications.
// So, we will import Permissions and Notifications from Expo.

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: "",
      isDatePickerVisible: false,
      showModal: false,
    };
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }
  static navigationOptions = {
    title: "Reserve Table",
  };
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  showDatePicker() {
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
    });
  }
  hideDatePicker() {
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
    });
  }
  handleConfirm(date) {
    this.hideDatePicker();
    this.setState({
      date: moment(date).format("MMMM Do YYYY hh:mm A").toString(),
    });
  }
  handleReservation() {
    Alert.alert(
      `Your Reservation OK?`,
      `Number of Guests: ${this.state.guests}
       Smoking? ${this.state.smoking ? "Yes" : "No"}
       Date & Time: ${this.state.date}`,
      [
        {
          text: "Cancel",
          onPress: () => this.resetForm(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  }
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
    });
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    console.log(permission.status);
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }
  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Your Reservation",
        body: "Reservation for " + date + " requested",
        ios: {
          sound: true,
        },
        android: {
          sound: true,
          vibrate: true,
          color: "#512DA8",
        },
      },
      trigger: {
        repeats: false,
        seconds: 10,
      },
    });
  }
  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn">
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="5" />
            </Picker>
            <Text style={styles.formLabel}>Number of Guests</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              onTintColor="#512DA8"
              onValueChange={(value) => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <Button
              title="Show Date Picker"
              onPress={() => this.showDatePicker()}
            />
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="datetime"
              value={this.props.date}
              placeholder="select date and time"
              minDate="2021-03-01"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
          </View>

          <View style={{ backgroundColor: "#512DA8", margin: 30 }}>
            <Button
              title="Reserve"
              color="white"
              onPress={() => this.handleReservation()}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </Animatable.View>

        {/* <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {
            this.toggleModal();
            this.resetForm();
          }}
          onRequestClose={() => {
            this.toggleModal();
            this.resetForm();
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Your Reservation</Text>
            <Text style={styles.modalText}>
              Number of Guests: {this.state.guests}
            </Text>
            <Text style={styles.modalText}>
              Smoking? : {this.state.smoking ? "Yes" : "No"}
            </Text>
            <Text style={styles.modalText}>
              When: {this.state.date.toString()}
            </Text>
            <View style={{ backgroundColor: "#512DA8" }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="white"
                title="Close"
              />
            </View>
          </View>
        </Modal> */}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
    marginTop: 30,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
export default Reservation;
