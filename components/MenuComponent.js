import React from "react";
import { View, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

function Menu(props) {
  const renderMenuItem = ({ item, index }) => {
    // return (
    //   <ListItem
    //     key={index}
    //     title={item.name}
    //     subtitle={item.description}
    //     hideChevron={true}
    //     leftAvatar={{ source: require("./images/uthappizza.png") }}
    //   />
    // );
    // chiveron is hidden by default in recent version of react-native-elements.
    return (
      <ListItem key={index}>
        <Avatar
          title={item.name}
          source={require("./images/uthappizza.png")}
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
    <FlatList
      data={props.dishes}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default Menu;
