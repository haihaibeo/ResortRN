import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RoomList from "../components/RoomList";
import { RoomScreen } from "./Rooms";

type StackFavRoomProps = {
  FavRooms: undefined;
  FavRoom: undefined;
};

const Stack = createStackNavigator();

const Favorites = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteRooms"
        component={FavoriteRoomsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Room"
        component={RoomScreen}
        options={{ title: "My favorite room" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const FavoriteRoomsScreen = ({
  route,
  navigation,
}: StackScreenProps<StackFavRoomProps>) => {
  return (
    <ScrollView>
      <RoomList rooms={favRooms}></RoomList>
    </ScrollView>
  );
};

const favRooms: Array<RoomCardProps> = [
  {
    id: 1,
    name: "My favorite room",
    previewImageUri: "https://picsum.photos/713",
    description: "This is description for my favorite room",
  },
];

export default Favorites;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    // marginTop: "5%",
    backgroundColor: "lightgray",
  },
  card: {
    marginBottom: "5%",
    backgroundColor: "lightyellow",
  },
});
