import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const RoomCard = (room: RoomCardProps) => {
  const navigation = useNavigation();
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("Room", { id: room.id, name: room.name })
      }
    >
      <Card.Title title={room.name}></Card.Title>
      <Card.Cover source={{ uri: room.previewImageUri }}></Card.Cover>
      <Card.Content>
        <Title>{room.name}</Title>
        <Paragraph>{room.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: "5%",
    backgroundColor: "lightyellow",
  },
});
