import React, { FC } from "react";
import { View, Text } from "react-native";
import RoomCard from "./RoomCard";

type RoomListProps = {
  rooms: RoomCardProps[];
};

const RoomList = ({ rooms: featuredRooms }: RoomListProps) => {
  return (
    <React.Fragment>
      {featuredRooms.map((room) => {
        return (
          <RoomCard
            key={room.id}
            id={room.id}
            name={room.name}
            previewImageUri={room.previewImageUri}
            description={room.description}
          ></RoomCard>
        );
      })}
    </React.Fragment>
  );
};
export default RoomList;
