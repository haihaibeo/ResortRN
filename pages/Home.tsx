import React, { Children, Component } from "react";
import { Button as BtnNative, RefreshControl, StyleSheet, Text, View } from "react-native";
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
import { RoomScreen } from './Rooms';
import { RoomContext } from "../contexts/RoomContext";


const Stack = createStackNavigator();

type StackHomeProps = { rooms: FormatRoomData[] };

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Featuring" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Room" component={RoomScreen} options={{ title: "" }}></Stack.Screen>
    </Stack.Navigator>
  );
}

const HomeScreen = () => {
  const context = React.useContext(RoomContext);
  return <RoomList rooms={context.states.featuredRooms}></RoomList>
};



const styles = StyleSheet.create({
  container: {
  },
});
export default Home;
