import React, { Component } from "react";
import { View, Text, ScrollView, Br } from "react-native";
import { Card } from "react-native-elements";
// import { DISHES } from "../shared/dishes";
// import { PROMOTIONS } from "../shared/promotions";
// import { LEADERS } from "../shared/leaders";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
function RenderItem(props) {
  const item = props.item;
  if (item != null) {
    return (
      <Card>
        <Card.Title>{item.name}</Card.Title>

        {/* <Card.Image source={require("./images/uthappizza.png")}> */}
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

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dishes: DISHES,
  //     promotions: PROMOTIONS,
  //     leaders: LEADERS,
  //   };
  // }
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        />
        <RenderItem
          item={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
        />
        <RenderItem
          item={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
        />
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);
