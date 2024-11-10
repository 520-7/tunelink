import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import PostComponent from "../components/PostComponent";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParamList";

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Feed">;
type FeedScreenRouteProp = RouteProp<RootStackParamList, "Feed">;

interface Props {
  navigation: FeedScreenNavigationProp;
  route: FeedScreenRouteProp;
}

const FeedScreen: React.FC<Props> = ({ navigation, route }) => {
  const userId = route.params.userId;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const posts = [
    {
      id: "1",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      username: "User456",
      timestamp: "2h ago",
      location: "New York",
      videoUri:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Just discovered this amazing track! 😍",
      comments: [
        { username: "Commenter1", text: "Great track!" },
        { username: "Commenter2", text: "This is my jam!" },
        { username: "Commenter3", text: "Loved it!" },
      ],
    },
    {
      id: "2",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      username: "User789",
      timestamp: "1h ago",
      location: "Los Angeles",
      videoUri:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "This song is so chill! 🎧",
      comments: [
        { username: "Commenter4", text: "Relaxing vibes!" },
        { username: "Commenter5", text: "Perfect for studying!" },
        { username: "Commenter6", text: "Smooth!" },
      ],
    },
    // Add more posts as needed
  ];

  // State to track which post is currently visible
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0);

  // Ref for FlatList
  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };
  const onViewRef = useRef((viewableItems: any) => {
    if (viewableItems.viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems.viewableItems[0].index);
    }
  });

  return (
    <View style={styles.container}>
      {/* Profile Button at the Top Right */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile", { userId })}
      >
        <Ionicons name="person-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PostComponent
            post={item}
            isCurrent={index === currentVisibleIndex}
          />
        )}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="musical-notes" size={30} color="#A8EB12" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("MakePost", { userId })}
        >
          <Ionicons name="add-circle" size={70} color="#A8EB12" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Profile", { userId })}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/30.jpg" }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  profileButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  header: {
    height: 100,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#4D4D4D",
    borderBottomWidth: 1,
    paddingTop: 30,
  },
  logo: {
    width: 120,
    height: 65,
    resizeMode: "contain",
  },
  feed: {
    flex: 1,
  },
  footer: {
    height: 80,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopColor: "#4D4D4D",
    borderTopWidth: 1,
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    transform: [{ translateX: 160 }, { translateY: 20 }],
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
});

export default FeedScreen;
