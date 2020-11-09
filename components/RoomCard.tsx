import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Paragraph, Title, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export const LikeButton = () => {
  const [icon, setIcon] = useState<string>("heart-outline");
  // TODO: setup snackbar for like button
  //const [snackBarVisible, setSnackBarVisible] = React.useState(false);

  const handleLikePress = () => {
    console.log("like clicked");
    if (icon === "heart") setIcon("heart-outline");
    else if (icon === "heart-outline") setIcon("heart");
  };

  return (
    <IconButton icon={icon} onPress={() => handleLikePress()}></IconButton>
  );
};

export const ShareButton = () => {
  const handleSharePress = () => {
    alert("go to share");
  };
  return (
    <IconButton icon={"send"} onPress={() => handleSharePress()}></IconButton>
  );
};

export const CommentButton = () => {
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
      <Card.Cover source={{ uri: room.previewImageUri, cache: "default" }}></Card.Cover>
      <Card.Content>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Title style={{ alignSelf: "center" }}>{room.name}</Title>

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
    marginBottom: "2%",
    marginLeft: "2%",
    marginRight: "2%",

    backgroundColor: "white",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    elevation: 2,
  },
});
