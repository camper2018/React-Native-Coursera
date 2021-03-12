import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, Modal, Button } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";
import { postComment } from "../redux/ActionCreators";
import { LogBox } from "react-native";

// To ignore VirtulizedLists warning
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
]);

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => {
    return dispatch(postComment(dishId, rating, author, comment));
  },
});
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.toggleModal()}
          />
        </View>
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
      showModal: false,
      rating: 3,
      author: "",
      comment: "",
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment = (dishId) => {
    // console.log(JSON.stringify(this.state));
    // const dishId = this.props.route.params.dishId;
    const { rating, comment, author } = this.state;
    this.props.postComment(dishId, rating, author, comment);
    this.toggleModal();
    this.resetForm();
  };
  resetForm() {
    this.setState({
      showModal: false,
      rating: 3,
      author: "",
      comment: "",
    });
  }
  render() {
    // navigation and route props are passed to all the screen components by Stack Navigator
    const dishId = this.props.route.params.dishId;
    // the plus in [+dishId] will convert dishId string into a number
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.toggleModal();
          }}
        >
          <View style={{ marginTop: 50 }}>
            <Rating
              showRating
              minValue={1}
              fractions={0}
              startingValue={3}
              onDismiss={() => {
                this.toggleModal();
              }}
              onFinishRating={(rating) => this.setState({ rating: rating })}
            />
          </View>
          <View>
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o", size: 24 }}
              onChangeText={(author) => this.setState({ author: author })}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o", size: 24 }}
              onChangeText={(comment) => {
                this.setState({ comment });
              }}
            />
          </View>
          <View style={{ backgroundColor: "#512DA8", margin: 30 }}>
            <Button
              color="white"
              title="SUBMIT"
              onPress={() => this.handleComment(dishId)}
            />
          </View>
          <View style={{ backgroundColor: "grey", margin: 30 }}>
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="white"
              title="CANCEL"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
