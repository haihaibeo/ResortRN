import React, { FC } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RoomContext } from "../contexts/RoomContext";
import RoomCard from "./RoomCard";

type RoomListProps = {
  rooms?: FormatRoomData[];
};

const RoomList = ({ rooms }: RoomListProps) => {
  const context = React.useContext(RoomContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const refresh = React.useCallback(() => {
    setRefreshing(true);
    context.update().then(() => setRefreshing(false));
  }, [])

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}></RefreshControl>}>
      {
        rooms?.map(r => {
          return (<RoomCard
            key={r.id}
            id={r.id}
            name={r.name}
            previewImageUri={r.images[0]}
            description={r.description} />);
        })
      }
    </ScrollView>
  );
}

export default RoomList;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    // marginTop: "5%",
    backgroundColor: "white",
  },
  card: {
    marginTop: "5%",
    backgroundColor: "white",
  },
});