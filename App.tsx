import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Propfile from './pages/Profile'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <MaterialIcons name={name} color={color} size={size} />;

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            tabBarIcon: getTabBarIcon("home"),
          }}
        />

        <BottomTab.Screen
          name="Rooms"
          component={Rooms}
          options={{
            title: "Rooms",
            tabBarIcon: getTabBarIcon("room"),
          }}
        />

        <BottomTab.Screen
          name="Faverites"
          component={Rooms}
          options={{
            title: "My faverites",
            tabBarIcon: getTabBarIcon("favorite"),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Propfile}
          options={{
            title: "My Profile",
            tabBarIcon: getTabBarIcon("person"),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
