import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { DISHES } from "../shared/dishes";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    const renderMenuItem = ({ item, index }) => {
      const { navigate } = this.props.navigation;
      return (
        <ListItem
          key={index}
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
        >
          <Avatar
            title={item.name}
            source={require("./images/uthappizza.png")}
            rounded={true}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Menu;
