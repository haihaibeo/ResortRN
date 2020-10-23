import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Paragraph, Title, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const LikeButton = () => {
  const [icon, setIcon] = useState<string>("heart-outline");

  const handleLikePress = () => {
    console.log("like clicked");
    if (icon === "heart") setIcon("heart-outline");
    else if (icon === "heart-outline") setIcon("heart");
  };

  return (
    <IconButton icon={icon} onPress={() => handleLikePress()}></IconButton>
  );
};

const ShareButton = () => {
  const handleSharePress = () => {
    alert("go to share");
  };
  return (
    <IconButton icon={"send"} onPress={() => handleSharePress()}></IconButton>
  );
};
const CommentButton = () => {
  const handleCommentSectionPress = () => {
    alert("go to comment section");
  };
  return (
    <IconButton
      icon={"comment-outline"}
      onPress={() => handleCommentSectionPress()}
    ></IconButton>
  );
};

const RoomCard = (room: RoomCardProps) => {
  const navigation = useNavigation();
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("Room", {
          id: room.id,
          name: room.name,
        })
      }
    >
      <Card.Cover source={{ uri: room.previewImageUri }}></Card.Cover>
      <Card.Content>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Title>{room.name}</Title>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <LikeButton></LikeButton>
            <CommentButton></CommentButton>
            <ShareButton></ShareButton>
          </View>
        </View>
        <Paragraph>{room.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: "0.5%",
    backgroundColor: "lightyellow",
  },
});
