import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { RoomContext } from "../contexts/RoomContext";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { SlideFromRightIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import { ActivityIndicator, Button, Card, List, Paragraph } from "react-native-paper";
import { Dimensions } from "react-native";
import { CommentButton, LikeButton, ShareButton } from "../components/RoomCard";
import { UserContext } from "../contexts/UserContext";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.75);

type RoomPageProp = {
  id: string;
};

type ImageCarouselProps = {
  imgs: string[];
}

const ImageCarousel = ({ imgs }: ImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const paginate = () => {
    return <Pagination
      dotsLength={imgs.length}
      dotStyle={{
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 8,
      }}
      containerStyle={{ paddingVertical: 10 }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      activeDotIndex={activeIndex}></Pagination>
  }

  const _renderItem = ({ item, index }: any) => {
    return (
      <Card.Cover source={{ uri: item, cache: "default" }}>
      </Card.Cover>
    );
  }

  return (
    <View>
      <Carousel
        style={styles.carousel}
        layout="tinder"
        renderItem={_renderItem}
        data={imgs}
        sliderWidth={SLIDER_WIDTH}
        onSnapToItem={(index) => setActiveIndex(index)}
        itemWidth={ITEM_WIDTH}
        layoutCardOffset={9}
      />
      {paginate()}
    </View>
  );
}

const RoomPage = ({ id }: RoomPageProp) => {
  const context = React.useContext(RoomContext);
  const userContext = React.useContext(UserContext);
  const [room, setRoom] = React.useState(context.states.rooms?.find(r => r.id === id));

  const [bookingLoading, setBookingLoading] = React.useState(false);

  const book = async () => {
    setTimeout(() => {
      console.log("booked");
    }, 500);
  }

  console.log(room);

  return (
    <>
      <ScrollView style={styles.container}>
        <ImageCarousel imgs={room?.images!} />

        <View style={{ paddingHorizontal: "2%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <LikeButton></LikeButton>
            <CommentButton></CommentButton>
            <ShareButton></ShareButton>
          </View>

          <List.Section title="Description">
            <List.Item title={room?.description} style={{ paddingVertical: 0 }}></List.Item>
          </List.Section>

          {room?.extras.length !== 0 ?
            <List.Section title="Extras">
              {room?.extras.map((extra, index) => {
                return <List.Item
                  style={{ paddingVertical: 0 }}
                  title={extra} key={index}
                  left={() => <List.Icon color="#000" icon="star-outline" />}>
                </List.Item>
              })}
            </List.Section>
            : <></>}

          {room?.pet === true ?
            <List.Section title="Pets">
              <List.Item title="Pets are allowed" left={() => <List.Icon color="#000" icon="star"></List.Icon>}>
              </List.Item>
            </List.Section>
            : <></>}
        </View>
      </ScrollView>

      {userContext.user !== undefined ?
        <>
          {bookingLoading ?
            <ActivityIndicator color="#2196F3"></ActivityIndicator>
            :
            <TouchableHighlight
              style={{ ...styles.openButton, marginBottom: 10 }}
              underlayColor="#0067b8"
              onPress={() => Alert.alert("Confirm", "Do you want to book this room?",
                [
                  {
                    text: "Cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => { book() }
                  },
                ])}
            >
              <Text style={{ ...styles.textStyle, color: "white" }}>Book</Text>
            </TouchableHighlight>
          }
        </>
        :
        <TouchableHighlight
          style={{ ...styles.openButton, marginBottom: 10 }}
          underlayColor="#0067b8"
          onPress={() => { userContext.toggleLoginModal(true) }}
        >
          <Text style={{ ...styles.textStyle, color: "white" }}>Login to book</Text>
        </TouchableHighlight>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 5
  },
  carousel: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    height: 300,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    alignSelf: "center"
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: "5%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default RoomPage;
