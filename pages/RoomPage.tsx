import React from "react";
import { StyleSheet, Text, View } from "react-native";

type RoomPageProp = {
  id: number;
};

const RoomPage = ({ id }: RoomPageProp) => {
  const roomId = JSON.stringify(id);
  return (
    <View style={styles.container}>
      <Text>Welcome to room {roomId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
  },
});

export default RoomPage;
