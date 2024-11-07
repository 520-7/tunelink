import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PostComponent from "../components/PostComponent";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Feed">;
interface Props {
  navigation: FeedScreenNavigationProp;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const FeedScreen: React.FC<Props> = ({ navigation }) => {
  // Mock post data
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
        onPress={() => navigation.navigate("Profile")}
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
});

export default FeedScreen;
