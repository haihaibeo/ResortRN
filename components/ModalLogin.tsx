import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { ActivityIndicator, Checkbox, TextInput } from "react-native-paper";
import { RoomContext } from "../contexts/RoomContext";
import { UserContext } from "../contexts/UserContext";
import { Setting } from "./Setting";
import SnackBarNotif from "./SnackBarNotif";

const URI: string = "https://resorthotel.azurewebsites.net";

interface FormProps {
    Email: string;
    Password: string;
    ConfirmPassword?: string;
}

type LoginResponse = {
    userId: string;
    token: string;
}

type LoginResult = {
    errors: string[];
    user: LoginResponse;
}

enum ActionType {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    SIGN_OUT = "SIGN_OUT"
}

type State = {
    isLoading: boolean;
    user?: LoginResponse;
}


const ModalLogin: React.FC = ({ }) => {
    const userContext = React.useContext(UserContext);

    const [modalVisible, setModalVisible] = useState(userContext.modalVisible);

    const [form, setForm] = useState<FormProps>({ Email: "", Password: "" });
    const [registerCheck, setRegisterCheck] = useState(false);
    const [userState, setUserState] = useState<State>({ isLoading: false })
    const [errors, setErrors] = useState<string[]>([""]);

    React.useEffect(() => {
        setModalVisible(userContext.modalVisible)
    }, [userContext.modalVisible])

    const loginAsync = async ({ Email, Password }: FormProps) => {
        if (Email.trim() === "" || Password.trim() === "") {
            setUserState({ isLoading: false });
            return { errors: ["Please enter all required fields"] } as LoginResult;
        }

        try {
            let raw = JSON.stringify({ "username": Email, "password": Password });
            let headers = new Headers();
            headers.append("Content-Type", "application/json");

            const response: Response = await fetch(URI + "/login", { method: "POST", body: raw, headers: headers });
            if (response.status === 200) {
                const data: LoginResponse = await response.json();
                setUserState({ isLoading: false, user: data });
                return { user: data } as LoginResult;
            }

            else if (response.status === 400) {
                const data: Error = await response.json();
                console.log(data);
                setUserState({ isLoading: false });
                return { errors: (data as any).errors } as LoginResult;
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (userState.user !== undefined) {
            return userContext.updateUser({ userId: userState.user?.userId, token: userState.user?.token })
        }
    }, [userState])

    // delete after
    React.useEffect(() => {
        loginAsync({ Email: "haihaibeo", Password: "Phamngochai1998!" })
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onShow={() => console.log("show")}
            onDismiss={() => console.log("hided")}
        >
            <View style={styles.centeredView}>
                <TextInput
                    label="Email" style={{ marginBottom: 10 }}
                    value={form.Email}
                    textContentType="emailAddress"
                    mode="flat"
                    onChangeText={text => setForm(form => ({ ...form, Email: text.trim() }))}></TextInput>

                <TextInput
                    label="Password" style={{ marginBottom: 10 }}
                    value={form.Password}
                    secureTextEntry={true}
                    textContentType="password"
                    mode="flat"
                    onChangeText={text => setForm(form => ({ ...form, Password: text }))}></TextInput>

                {registerCheck &&
                    <TextInput
                        label="Confirm password" style={{ marginBottom: 10 }}
                        mode="flat"
                        value={form.ConfirmPassword}
                        secureTextEntry={true}
                        textContentType="password"
                        onChangeText={text => setForm(form => ({ ...form, ConfirmPassword: text }))}
                    ></TextInput>}

                {errors.map((value, index) => <Text style={{ color: "red" }} key={index}>{value}</Text>)}

                <Checkbox.Item style={{ marginLeft: 0, paddingHorizontal: 0 }}
                    label="I don't have an account"
                    color="#2196F3"
                    labelStyle={{ color: "#2196F3" }}
                    status={registerCheck ? "checked" : "unchecked"}
                    onPress={() => setRegisterCheck(!registerCheck)}
                ></Checkbox.Item>


                {userState.isLoading ? <ActivityIndicator color="#2196F3"></ActivityIndicator> :
                    <>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3", marginBottom: 10 }}
                            underlayColor="#0067b8"
                            onPress={() => {
                                setErrors([]);
                                setUserState(states => ({ ...states, isLoading: true }))
                                if (registerCheck === false) {
                                    loginAsync({ Email: form.Email, Password: form.Password }).then((result) => {
                                        if (result?.errors === undefined) {
                                            setTimeout(() => {
                                                userContext.toggleLoginModal(false);
                                            }, 2000)
                                        }
                                        else {
                                            setErrors(result?.errors!);
                                            userContext.toggleLoginModal(true);
                                        }
                                    });
                                }
                            }}
                        >
                            <Text style={styles.textStyle}> {registerCheck ? "Register" : "Sign in"}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "white", marginBottom: 10 }}
                            underlayColor="#c4c4c4"
                            onPress={() => userContext.toggleLoginModal(false)}
                        >
                            <Text style={{ ...styles.textStyle, color: "#2196F3" }}>Close</Text>
                        </TouchableHighlight>
                    </>
                }
            </View>
        </Modal>
    );
}

export default ModalLogin;

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