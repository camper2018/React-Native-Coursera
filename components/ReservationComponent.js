import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Modal,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-community/picker";
import moment from "moment";

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
      // date: date,
      date: moment(date).format("MMMM Do YYYY hh:mm A").toString(),
    });
  }
  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
    // this.setState({
    //   guests: 1,
    //   smoking: false,
    //   date: "",
    // });
  }
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
    });
  }
  render() {
    return (
      <ScrollView>
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
        <View style={styles.formRow}>
          <Button
            title="Reserve"
            color="#512DA8"
            onPress={() => this.handleReservation()}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Modal
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
        </Modal>
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
