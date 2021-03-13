import React, { Component } from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Aminatable from "react-native-animatable";
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};
// Using VirtualizedView function to remove warning that occurs when nesting FlatList inside ScrollView due to performance issues.
// This warning was not seen with older versions of react-native-elements.
export const VirtualizedView = (props) => {
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
};
const History = () => {
  return (
    <Card>
      <Card.Title>Our History</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.
      </Text>

      <Text style={{ margin: 10 }}>
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
};

class About extends Component {
  render() {
    const RenderLeaders = ({ item, index }) => {
      return (
        <ListItem key={index}>
          <Avatar
            title={item.name}
            source={{ uri: baseUrl + item.image }}
            rounded={true}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700", paddingBottom: 10 }}>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };
    if (this.props.leaders.isLoading) {
      return (
        <VirtualizedView>
          <Aminatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />
            <Card>
              <Card.Title>Corporate Leadership</Card.Title>
              <Loading />
            </Card>
          </Aminatable.View>
        </VirtualizedView>
      );
    } else if (this.props.leaders.errMess) {
      return (
        <VirtualizedView>
          <Aminatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />
            <Card>
              <Card.Title>Corporate Leadership</Card.Title>
              <Text>{this.props.leaders.errMess}</Text>
            </Card>
          </Aminatable.View>
        </VirtualizedView>
      );
    } else {
      return (
        <VirtualizedView>
          <Aminatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />
            <Card>
              <Card.Title>Corporate Leadership</Card.Title>
              <Card.Divider />
              <FlatList
                data={this.props.leaders.leaders}
                renderItem={RenderLeaders}
                keyExtractor={(item) => item.id.toString()}
              />
            </Card>
          </Aminatable.View>
        </VirtualizedView>
      );
    }
  }
}

export default connect(mapStateToProps)(About);
