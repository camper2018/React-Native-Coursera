import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};
class Favorites extends Component {
  // static navigationOptions = {
  //   title: "My Favorites",
  // };
  render() {
    const renderMenuItem = ({ item, index }) => {
      const { navigate } = this.props.navigation;
      return (
        <ListItem
          key={index}
          bottomDivider
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
        >
          <Avatar
            title={item.name}
            source={{ uri: baseUrl + item.image }}
            rounded={true}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700", paddingBottom: 10 }}>
              {/* <ListItem.Title
              style={{ flexDirection: "row", paddingLeft: 10, paddingTop: 5 }}
            > */}
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontFamily: "Courier New" }}>
              {item.description}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          // check each dish and if it's id is equal to favorite's dishId then display those only.
          data={this.props.dishes.dishes.filter((dish) =>
            this.props.favorites.some((el) => el === dish.id)
          )}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
}
export default connect(mapStateToProps)(Favorites);
