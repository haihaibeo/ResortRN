import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RoomList from "../components/RoomList";
import { RoomContext } from "../contexts/RoomContext";
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
        name="Favorites"
        component={FavoriteRoomsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Room"
        component={RoomScreen}
        options={{ title: "" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const FavoriteRoomsScreen = ({
  route,
  navigation,
}: StackScreenProps<StackFavRoomProps>) => {
  const context = React.useContext(RoomContext);

  return (
    <RoomList rooms={context.states.rooms}></RoomList>
  );
};

export default Favorites;
