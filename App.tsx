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
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";

import { StatusBar } from "react-native";

import { RoomProvider } from "./contexts/RoomContext";
import SnackBarNotif from "./components/SnackBarNotif";
import { UserContext, UserProvider } from "./contexts/UserContext";
import ModalLogin from "./components/ModalLogin";

const BottomTab = createBottomTabNavigator();

export const URI: string = "https://resorthotel.azurewebsites.net";

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <MaterialIcons name={name} color={color} size={size} />;

export default function App() {
  const userCtx = React.useContext(UserContext);

  React.useEffect(() => {
    userCtx.user === undefined ?? userCtx.toggleLoginModal(true);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content"></StatusBar>
      <RoomProvider>
        <UserProvider>
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
                  title: "All Rooms",
                  tabBarIcon: getTabBarIcon("search"),
                }}
              />

              <BottomTab.Screen
                name="Faverites"
                component={Favorites}
                options={{
                  title: "My faverites",
                  tabBarIcon: getTabBarIcon("favorite"),
                }}
              />
              <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: "My Profile",
                  tabBarIcon: getTabBarIcon("settings"),
                }}
              />
            </BottomTab.Navigator>
          </NavigationContainer>
          <ModalLogin></ModalLogin>
        </UserProvider>
      </RoomProvider>
    </>
  );
}