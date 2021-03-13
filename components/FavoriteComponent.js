import React, { Component } from "react";
import { FlatList, View, Text, Alert } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import Swipeout from "react-native-swipeout";
import { deleteFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});
class Favorites extends Component {
  render() {
    const renderMenuItem = ({ item, index }) => {
      const { navigate } = this.props.navigation;
      const rightButtons = [
        {
          text: "Delete",
          type: "delete",
          onPress: () => {
            Alert.alert(
              "Delete Favorite?",
              "Are you sure you wish to delete the favorite dish " +
                item.name +
                "?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log(item.name + " Not Deleted"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => this.props.deleteFavorite(item.id),
                },
              ],
              {
                cancelable: false,
              }
            );
          },
        },
      ];
      return (
        <Swipeout right={rightButtons} autoClose={true}>
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
                {item.name}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontFamily: "Courier New" }}>
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Swipeout>
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
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
