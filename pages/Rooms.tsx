import React, { Component } from "react";
import { Button as BtnNative, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import {
  Searchbar,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import RoomCard from "../components/RoomCard";
import RoomPage from "./RoomPage";
import RoomList from "../components/RoomList";
import { RoomContext } from "../contexts/RoomContext";

const Stack = createStackNavigator();
type StackRoomsProps = { Rooms: undefined; Room: undefined };

export default class ShowRoom extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Rooms" component={AllRoomsScreen}></Stack.Screen>
        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={{ title: "" }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const AllRoomsScreen = ({ navigation }: StackScreenProps<StackRoomsProps>) => {
  const context = React.useContext(RoomContext);
  const allRooms = context.states?.rooms;

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [Rooms, setRooms] = React.useState(allRooms);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  React.useEffect(() => {
    if (searchQuery.length === 0) setRooms(allRooms);
    else {
      if (allRooms !== undefined) {
        setRooms(findRoomsByName(searchQuery.trim(), allRooms))
      }
    }
  }, [searchQuery])

  return (
    <React.Fragment>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => onChangeSearch(text)}
      ></Searchbar>
      <RoomList rooms={Rooms}></RoomList>
    </React.Fragment>
  );
};

const findRoomsByName = (name: string, allRooms: FormatRoomData[]): FormatRoomData[] => {
  return allRooms.filter((room) => room.name.includes(name));
};

export const RoomScreen = ({
  route,
  navigation,
}: StackScreenProps<StackRoomsProps>) => {
  const [newTitle, setNewTitle] = React.useState(
    (route.params as FormatRoomData).name
  );
  const [id, setId] = React.useState((route.params as FormatRoomData).id);

  React.useEffect(() => {
    navigation.setOptions({
      title: newTitle === "" ? "No title" : newTitle,
    });
  });

  return <RoomPage id={id}></RoomPage>;
};
