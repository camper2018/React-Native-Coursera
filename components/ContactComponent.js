import React from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";

function RenderContact() {
  return (
    <Card>
      <Card.Title>Contact Information</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        121, Clear Water Bay Road
        {"\n"}
        {"\n"}
        Clear Water Bay, Kowloon
        {"\n"}
        {"\n"}
        HONG KONG
        {"\n"}
        {"\n"}
        Tel: +852 1234 5678
        {"\n"}
        {"\n"}
        Fax: +852 8765 4321
        {"\n"}
        {"\n"}
        Email:confusion@food.net
      </Text>
    </Card>
  );
}
const Contact = () => <RenderContact />;

export default Contact;
