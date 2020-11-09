import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RoomContext } from "../contexts/RoomContext";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { SlideFromRightIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import { ActivityIndicator, Card, List, Paragraph } from "react-native-paper";
import { Dimensions } from "react-native";
import { CommentButton, LikeButton, ShareButton } from "../components/RoomCard";

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
  const [room, setRoom] = React.useState(context.states.rooms?.find(r => r.id === id));
  console.log(room);

  return (
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
  }
});

export default RoomPage;
