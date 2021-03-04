import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card>
        {/* <Card.Title>{dish.name}</Card.Title> */}
        <Card.Image source={require("./images/uthappizza.png")}>
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
      </Card>
    );
  } else {
    return <View></View>;
  }
  h;
}
class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    // navigation and route props are passed to all the screen components by Stack Navigator
    const dishId = this.props.route.params.dishId;
    // the plus in [+dishId] will convert dishId string into a number
    return <RenderDish dish={this.state.dishes[+dishId]} />;
  }
}
export default Dishdetail;
