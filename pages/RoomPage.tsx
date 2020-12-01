import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { FlatList, ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { RoomContext } from "../contexts/RoomContext";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { SlideFromRightIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import { ActivityIndicator, Button, Card, List, Paragraph } from "react-native-paper";
import { Dimensions } from "react-native";
import { CommentButton, LikeButton, ShareButton } from "../components/RoomCard";
import { UserContext } from "../contexts/UserContext";
import { yellowA700 } from "react-native-paper/lib/typescript/src/styles/colors";

const URI: string = "https://resorthotel.azurewebsites.net";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.75);

type RoomPageProp = {
  id: string;
};

type ImageCarouselProps = {
  imgs: string[];
}

type ReservationHistory = {
  id: string;
  roomId: string;
  userId: string;
  createdTime: string;
}

type UserCanDo = {
  Book: boolean;
  Cancel: boolean;
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

const checkUserCanDoAsync = async (roomId: string, userId: string): Promise<UserCanDo> => {
  let userCanDo: UserCanDo = { Book: false, Cancel: false };
  const response: Response = await fetch(URI + "/api/reservation/check-room/" + roomId, { method: "GET" });
  if (response.status === 200) {
    const data: ReservationHistory = await response.json();

    if (data.id === null) {
      userCanDo.Book = true;
      userCanDo.Cancel = false;
      return userCanDo;
    }

    if (data.userId === userId) {
      userCanDo.Book = false;
      userCanDo.Cancel = true;
    } else {
      userCanDo.Book = false;
      userCanDo.Cancel = false;
    }
  }

  return userCanDo;
}

const RoomPage = ({ id }: RoomPageProp) => {
  const context = React.useContext(RoomContext);
  const userContext = React.useContext(UserContext);
  const [room, setRoom] = React.useState(context.states.rooms?.find(r => r.id === id));

  const [bookingLoading, setBookingLoading] = React.useState(true);

  const [userCanDo, setUserCanDo] = useState<UserCanDo>({ Book: false, Cancel: false });

  const book = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + userContext.user?.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "roomId": id });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const response: Response = await fetch(URI + "/api/reservation", requestOptions);
    if (response.status === 200) {
      let msg: ResponseMessage = await response.json();
      console.log(msg);
    }

    checkUserCanDoAsync(id, userContext.user!.userId).then(res => {
      setUserCanDo(res);
    });
  }

  const cancelBook = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + userContext.user?.token);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };

    const response: Response = await fetch(URI + "/api/reservation/" + id, requestOptions);
    if (response.status === 200) {
      const msg: ResponseMessage = await response.json();
      console.log(msg);
    }

    checkUserCanDoAsync(id, userContext.user!.userId).then(res => {
      setUserCanDo(res);
    });
  }

  React.useEffect(() => {
    if (userContext.user !== undefined)
      checkUserCanDoAsync(id, userContext.user.userId).then(res => {
        setUserCanDo(res);
        setBookingLoading(false);
      });
  }, [userContext.user]);

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
            <>
              {userCanDo.Cancel === true ?
                <TouchableHighlight
                  style={{ ...styles.openButton, marginBottom: 10, backgroundColor: "#b51414" }}
                  underlayColor="#700c0c"
                  onPress={() => Alert.alert("Confirm", "Do you want to cancel this room?",
                    [
                      {
                        text: "Cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          setBookingLoading(true);
                          cancelBook().finally(() => setBookingLoading(false));
                        }
                      },
                    ])}
                >
                  <Text style={{ ...styles.textStyle, color: "white" }}>Cancel book</Text>
                </TouchableHighlight> : <></>
              }

              {userCanDo.Book === true ?
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
                        onPress: () => {
                          setBookingLoading(true);
                          book().finally(() => setBookingLoading(false));
                        }
                      },
                    ])}
                >
                  <Text style={{ ...styles.textStyle, color: "white" }}>Book</Text>
                </TouchableHighlight> : <></>
              }

              {userCanDo.Book === false && userCanDo.Cancel === false ?
                <TouchableHighlight
                  style={{ ...styles.openButton, marginBottom: 10, backgroundColor: "gray" }}
                  underlayColor="gray"
                >
                  <Text style={{ ...styles.textStyle, color: "white" }}>Room Not Available</Text>
                </TouchableHighlight>
                : <></>}
            </>
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
