import React, { Children } from "react"
import { RecyclerViewBackedScrollView } from "react-native"
import ModalLogin from "../components/ModalLogin"

type UserContextProps = {
    user?: UserState;
    updateUser: (user: UserState) => void;
    toggleLoginModal: (visible: boolean) => void;
    modalVisible: boolean;
}

type UserState = {
    userId: string;
    token: string;
}

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps)

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<UserState>();
    const [modalVisible, setModalVisible] = React.useState(true);

    const updateUser = (user: UserState) => {
        setUser(user);
    }

    const toggleLoginModal = (vis: boolean) => {
        setModalVisible(vis);
    }

    return (
        <UserContext.Provider value={{ user: user, updateUser: updateUser, toggleLoginModal: toggleLoginModal, modalVisible: modalVisible }}>
            {children}
        </UserContext.Provider>
    )
}