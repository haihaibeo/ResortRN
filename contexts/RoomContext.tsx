import { useGestureHandlerRef } from "@react-navigation/stack";
import React from "react"

export const RoomContext = React.createContext<RoomContextProps>({} as RoomContextProps);
const URI: string = "https://resorthotel.azurewebsites.net"

type RoomContextProps = {
    states: Partial<RoomContextStates>;
    update: () => Promise<void>;
}

type RoomContextStates = {
    rooms: FormatRoomData[];
    featuredRooms: FormatRoomData[];
    sorted: FormatRoomData[];
    loading: boolean;

    type: string;
    priceStates: {
        price: number;
        minPrice: number;
        maxPrice: number;
    }
    sizeStates: {
        size: number;
        minSize: number;
        maxSize: number;
    }

    bfPet: {
        breakfast: boolean;
        pet: boolean;
    }
}

export const RoomProvider: React.FC = ({ children }) => {
    const [states, setStates] = React.useState<Partial<RoomContextStates>>({ loading: true });

    const getData = async () => {
        try {
            const response: Response = await fetch(URI + "/api/room");
            const data: Array<FormatRoomData> = await response.json();
            setStates({ rooms: data, loading: false })
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

    React.useEffect(() => {
        if (states.rooms !== undefined) {
            const rooms = states.rooms;
            const ftRooms = rooms.filter(r => r.featured === true);
            setStates(s => ({
                ...s,
                featuredRooms: ftRooms
            }))
        }

    }, [states.rooms])

    return <RoomContext.Provider value={{ states: states, update: getData }}>
        {children}
    </RoomContext.Provider>
}

