import React, { Children } from "react"
import { RecyclerViewBackedScrollView } from "react-native"

type UserContextProps = {
    user?: UserState;
    updateUser: (user: UserState) => void;
}

type UserState = {
    userId: string;
    token: string;
}

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps)

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<UserState>();

    const updateUser = (user: UserState) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ user: user, updateUser: updateUser }}>
            {children}
        </UserContext.Provider>
    )
}