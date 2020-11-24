import { StackActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, Modal, Systrace, Alert } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { Button, TextInput, Checkbox } from "react-native-paper";
import { Value } from "react-native-reanimated";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ModalLogin from "../components/ModalLogin";
import { Setting } from "../components/Setting";
import { UserContext } from "../contexts/UserContext";

const GetIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <MaterialIcons name={name} color={color} size={size} />;

const Stack = createStackNavigator();


const Profile: React.FC<{}> = ({ }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={ProfileScreen}></Stack.Screen>
      <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

const AccountScreen = ({ navigation, route }: any) => {
  const userContext = React.useContext(UserContext);
  React.useEffect(() => { console.log(userContext.user?.userId) }, [])
  return <Text>USER_ID: {userContext.user?.userId}</Text>
}

const ProfileScreen = () => {
  const userContext = React.useContext(UserContext);
  const [user, setUser] = React.useState(userContext.user);
  const navigation = useNavigation();

  React.useEffect(() => {
    setUser(userContext.user);
  }, [userContext.user])

  const signOut = () => {
    userContext.updateUser(undefined as any);
  }

  return (
    <ScrollView style={styles.container}>
      {user !== undefined ?
        <>
          <Setting setting="Your bookings" iconName="bookmark-border"></Setting>
          <Setting setting="Account" iconName="person" onPressHandle={() => { navigation.navigate("Account") }}></Setting>
        </> : <></>
      }

      <Setting setting="Privacy" iconName="security"></Setting>
      <Setting setting="Help" iconName="help-outline"></Setting>

      {user !== undefined ?
        <Setting setting="Sign Out" iconName="exit-to-app" onPressHandle={() => Alert.alert("Sign out?", "",
          [
            {
              text: "Cancel"
            }, {
              text: "OK",
              onPress: () => signOut()
            }
          ])} />
        :
        <>
          <Setting setting="Login" iconName="exit-to-app" onPressHandle={() => { userContext.toggleLoginModal(true) }}></Setting>
        </>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "flex-start",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  textSetting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  settingContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    padding: "5%"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Profile;
