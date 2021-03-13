import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  Button,
  Alert,
  PanResponder,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";
import { postComment } from "../redux/ActionCreators";
import { LogBox } from "react-native";
import * as Aminatable from "react-native-animatable";
// To ignore VirtulizedLists warning
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
  "componentWillReceiveProps has been renamed, and is not recommended for use.",
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

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    // MoveX is the latest screen coordinates of the recently moved touch gesture
    // and similarly moveY is the screen coordinates of the recently moved touch,
    // the X and Y coordinates of that point.
    // Now, the dx is the accumulated distance of the gesture since the touch started along the X direction.
    // So, if you touch the screen at one point and then you drag your screen across to create the gesture and then lift the screen.
    // The distance that your touch gesture drags along the screen is given by dx and dy. Dx along the X axis and dy along the Y axis.
    // Now, in this case, I am going to recognize only the right to left gesture on the screen.
    // If the dx value is less than minus 200 meaning that it has accumulated a distance of 200 but in the right to left direction, so in the negative direction.
    // So, the way the distances are measured is the coordinates always are measured with 00 at the top-left corner.
    // So a distance traveled in the negative direction will have a negative value here.
    // So if dx is less than 200, then I will return a true to indicate that indeed this was a right to left pan gesture that the user did.
    // Now, along the Y direction, we don't really care. We are only interested if the user has done sufficient distance of the gesture on the screen along the X direction.
    // Otherwise, you will return a false
    if (dx < -200) {
      return true;
    } else {
      false;
    }
  };
  //PanResponder.create() accepts callbacks
  const panResponder = PanResponder.create({
    // onStartShouldSetPanResponder starts when user gesture begins on the screen and gives access to event and gesture state.

    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    // So this one will be invoked when the user lifts their finger off the screen after performing the gesture.
    // gestureState is passed to recognizeDrag() which provides us certain properties like moveX, moveY etc
    // and we can use them to recognize the gesture done by user and how we want to respond to it.
    onPanResponderEnd: (e, gestureState) => {
      // This will return a true if this is a swipe left gesture that the user has done.
      // If that is the case then we're going to interpret that gesture to mean that the user wants to add this particular dish to his or her list of favorite dishes.
      // So, that's where we will generate an alert
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add to Favorites?",
          "Are you sure you wish to add " + dish.name + " to your favorites?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress(),
            },
          ],
          { cancelable: false }
        );
        return true;
      }
    },
  });
  if (dish != null) {
    return (
      <Aminatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        {...panResponder.panHandlers}
        // All the  pan handler functions that we have implemented or callback functions that we have implemented will be added in to this view.
        // Now, on this view, any gesture that user does, the panhandlers are supposed to handle that gesture.
      >
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
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#512DA8"
              onPress={props.toggleModal}
            />
          </View>
        </Card>
      </Aminatable.View>
    );
  } else {
    return <View></View>;
  }
  h;
}
function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    let rating = parseInt(item.rating);
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14, paddingBottom: 7 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        {/* <Rating
          startingValue={rating}
          readonly
          imageSize={10}
          style={{ alignItems: "left", paddingBottom: 7 }}
        /> */}
        <Text style={{ fontSize: 12, paddingBottom: 7 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Aminatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card>
        <Card.Title>Comments</Card.Title>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Aminatable.View>
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
          toggleModal={this.toggleModal}
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
          onRequestClose={this.toggleModal}
        >
          <View style={{ marginTop: 50 }}>
            <Rating
              showRating
              minValue={1}
              fractions={0}
              startingValue={3}
              onDismiss={this.toggleModal}
              onFinishRating={(value) => this.setState({ rating: value })}
            />
          </View>
          <View>
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o", size: 24 }}
              onChangeText={(value) => this.setState({ author: value })}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o", size: 24 }}
              onChangeText={(value) => {
                this.setState({ comment: value });
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
