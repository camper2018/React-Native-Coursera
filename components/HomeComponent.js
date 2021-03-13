import React, { Component } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
function RenderItem(props) {
  const item = props.item;
  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
      return (
        <Card>
          {/* <Card.Title>{item.name}</Card.Title> */}
          <Card.Image source={{ uri: baseUrl + item.image }}>
            <Card.FeaturedTitle
              style={{
                marginTop: 55,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              {item.name}
              {"\n"}

              <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
            </Card.FeaturedTitle>
          </Card.Image>

          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    } else {
      return <View></View>;
    }
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    // this is an animated value type object which is used by the animated API in order to perform certain operations.
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.animate();
  }
  animate() {
    this.animatedValue.setValue(0);
    // So the animated timing takes animatedValue and then you can specify how you want to change that value as a function of time
    Animated.timing(this.animatedValue, {
      toValue: 8,
      duration: 8000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.animate());
  }
  // So start() function will be called when this animation steps go through.
  // So, the value will be changed from zero to eight for eight seconds duration
  // and then when it completes the start callback will fire and will recall animate() to restart the whole thing.

  render() {
    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos1 }] }}
        >
          <RenderItem
            item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos2 }] }}
        >
          <RenderItem
            item={
              this.props.promotions.promotions.filter(
                (promo) => promo.featured
              )[0]
            }
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos3 }] }}
        >
          <RenderItem
            item={
              this.props.leaders.leaders.filter((leader) => leader.featured)[0]
            }
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
        </Animated.View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(Home);
