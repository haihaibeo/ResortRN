import React, { Component } from "react";
import { Button as BtnNative, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import RoomCard from "../components/RoomCard";
import RoomPage from "./RoomPage";
import RoomList from "../components/RoomList";

const Stack = createStackNavigator();
type StackRoomsProps = { Rooms: undefined; Room: undefined };

export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Rooms" component={RoomsScreen}></Stack.Screen>
        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={{ title: "My room" }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const RoomsScreen = ({ navigation }: StackScreenProps<StackRoomsProps>) => {
  return (
    <ScrollView style={styles.container}>
      <RoomList rooms={Rooms}></RoomList>
    </ScrollView>
  );
};

const RoomScreen = ({
  route,
  navigation,
}: StackScreenProps<StackRoomsProps>) => {
  const { id } = route.params;
  return <RoomPage id={id}></RoomPage>;
};

const Rooms: Array<RoomCardProps> = [
  {
    id: 1,
    name: "Room 1",
    previewImageUri: "https://picsum.photos/708",
    description: "This is description for feature room 1",
  },
  {
    id: 2,
    name: "Room 2",
    previewImageUri: "https://picsum.photos/709",
    description: "This is description for feature room 2",
  },
  {
    id: 3,
    name: "Room 3",
    previewImageUri: "https://picsum.photos/710",
    description: "This is description for feature room 3",
  },
  {
    id: 4,
    name: "Room 4",
    previewImageUri: "https://picsum.photos/711",
    description: "This is description for feature room 3",
  },
  {
    id: 5,
    name: "Room 5",
    previewImageUri: "https://picsum.photos/712",
    description: "This is description for feature room 3",
  },
];

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