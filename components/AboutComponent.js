import React, { Component } from "react";
import { Text, SafeAreaView, VirtualizedList } from "react-native";
import { Card } from "react-native-elements";
import { LEADERS } from "../shared/leaders";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView, View } from "react-native-gesture-handler";

// Using VirtualizedView function to remove warning that occurs when nesting FlatList inside ScrollView due to performance issues.
// This warning was not seen with older versions of react-native-elements.
function VirtualizedView(props) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}
const History = () => {
  return (
    <Card>
      <Card.Title>Our History</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10, fontWeight: "700" }}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.
      </Text>

      <Text style={{ margin: 10, fontWeight: "700" }}>
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS,
    };
  }
  render() {
    const RenderLeaders = ({ item, index }) => {
      // const { navigate } = this.props.navigation;
      return (
        <ListItem key={index}>
          <Avatar
            title={item.name}
            source={require("./images/alberto.png")}
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
      <VirtualizedView>
        <History />
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList
            data={this.state.leaders}
            renderItem={RenderLeaders}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </VirtualizedView>
    );
  }
}

export default About;
