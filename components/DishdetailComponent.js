import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";

import { VirtualizedView } from "./AboutComponent";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
  };
};
function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + dish.image }}>
          <Card.FeaturedTitle
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              lineHeight: 150,
            }}
          >
            {dish.name}
          </Card.FeaturedTitle>
        </Card.Image>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorite ? console.log("Already favorite") : props.onPress()
          }
        />
      </Card>
    );
  } else {
    return <View></View>;
  }
  h;
}
function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card>
      <Card.Title>Comments</Card.Title>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}
class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }
  markFavorite(dishId) {
    this.setState({ favorites: this.state.favorites.concat(dishId) });
  }

  render() {
    // navigation and route props are passed to all the screen components by Stack Navigator
    const dishId = this.props.route.params.dishId;
    // the plus in [+dishId] will convert dishId string into a number
    return (
      // <ScrollView>
      <VirtualizedView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.state.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        {/* </ScrollView> */}
      </VirtualizedView>
    );
  }
}
export default connect(mapStateToProps)(Dishdetail);
