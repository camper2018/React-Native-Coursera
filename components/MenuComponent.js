import React, { Component } from "react";
import { FlatList } from "react-native";
// import { ListItem, Avatar } from "react-native-elements";
import { Tile, Avatar } from "react-native-elements";
// import { DISHES } from "../shared/dishes";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

class Menu extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dishes: DISHES,
  //   };
  // }

  render() {
    const renderMenuItem = ({ item, index }) => {
      const { navigate } = this.props.navigation;
      return (
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        >
          {/* <Avatar
            title={item.name}
            source={{ uri: baseUrl + item.image }}
            rounded={true}
          /> */}
          {/* <Tile.Content>
            <Tile.Title style={{ fontWeight: "bold" }}>{item.name}</Tile.Title>
            <Tile.Subtitle>{item.description}</Tile.Subtitle>
          </Tile.Content> */}
        </Tile>
      );
    };

    return (
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Menu);
