import React from "react";
import { GestureResponderEvent, View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

type SettingProps = {
    setting: string;
    iconName: string;
    onPressHandle?: (event: GestureResponderEvent) => void;
};
export const Setting = ({ setting, iconName, onPressHandle }: SettingProps) => {
    return (
        <TouchableHighlight
            activeOpacity={0.3}
            onPress={onPressHandle}
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