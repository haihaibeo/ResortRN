import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type SettingProps = {
  setting: string;
  iconName: string;
};

const GetIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <MaterialIcons name={name} color={color} size={size} />;

const Stack = createStackNavigator();

const Setting = ({ setting, iconName }: SettingProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.3}
      onPress={() => alert("go to " + setting)}
      underlayColor="light"
    >
      <View style={styles.settingContainer}>
        <Icon name={iconName} size={25} style={{ marginRight: 10 }}></Icon>
        <Text style={styles.textSetting}>{setting}</Text>
        <Icon
          name="navigate-next"
          size={26}
          style={{ marginLeft: "auto" }}
        ></Icon>
      </View>
    </TouchableHighlight>
  );
};

const Profile: React.FC<{}> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={ProfileScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Setting setting="Your bookings" iconName="bookmark-border"></Setting>
      <Setting setting="Account" iconName="person"></Setting>
      <Setting setting="Privacy" iconName="security"></Setting>
      <Setting setting="Help" iconName="help-outline"></Setting>
      <Setting setting="Sign Out" iconName="exit-to-app"></Setting>
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
});

export default Profile;
