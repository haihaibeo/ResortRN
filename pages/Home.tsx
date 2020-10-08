import React, { Children, Component } from "react";
import { Button as BtnNative, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import RoomCard from "../components/RoomCard";
import RoomList from "../components/RoomList";
import RoomPage from "./RoomPage";

const Stack = createStackNavigator();

type StackHomeProps = { Home: undefined; Room: undefined };

export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Room" component={RoomScreen}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const HomeScreen = ({ navigation }: StackScreenProps<StackHomeProps>) => {
  return (
    <ScrollView style={styles.container}>
      <RoomList rooms={featuredRooms}></RoomList>
    </ScrollView>
  );
};

const RoomScreen = ({
  route,
  navigation,
}: StackScreenProps<StackHomeProps>) => {
  const { id } = route.params;
  return <RoomPage id={id}></RoomPage>;
};

const featuredRooms: Array<RoomCardProps> = [
  {
    id: 1,
    name: "Featured room 1",
    previewImageUri: "https://picsum.photos/705",
    description: "This is description for feature room 1",
  },
  {
    id: 2,
    name: "Featured room 2",
    previewImageUri: "https://picsum.photos/706",
    description: "This is description for feature room 2",
  },
  {
    id: 3,
    name: "Featured room 3",
    previewImageUri: "https://picsum.photos/707",
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
    marginTop: "5%",
    backgroundColor: "lightyellow",
  },
});
