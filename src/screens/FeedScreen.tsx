import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import PostComponent from "../components/PostComponent";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Feed">;

interface Props {
  navigation: FeedScreenNavigationProp;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const FeedScreen: React.FC<Props> = ({ navigation }) => {
  const ownerUser = "671bc105585601fcdbebad64";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0);

  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };
  const onViewRef = useRef(
    useCallback(({ viewableItems }) => {
      if (viewableItems.length > 0) {
        setCurrentVisibleIndex(viewableItems[0].index);
      }
    }, [])
  );

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feedResponse = await fetch(
          `http://${SERVERIP}:${SERVERPORT}/api/feed/get_feed/${ownerUser}`
        );
        const feedData = await feedResponse.json();

        const usersResponse = await Promise.all(
          feedData["feed"].map((post) =>
            fetch(`http://${SERVERIP}:${SERVERPORT}/api/user/${post.ownerUser}`)
          )
        );
        const usersData = await Promise.all(
          usersResponse.map((res) => res.json())
        );

        const postsWithAvatars = feedData["feed"].map((post) => {
          const user = usersData.find((user) => user._id === post.ownerUser);
          return {
            ...post,
            userAvatarUrl: user
              ? `http://${SERVERIP}:${SERVERPORT}/api/files/userAvatar/${user.userAvatarUrl}`
              : null,
          };
        });

        setPosts(postsWithAvatars);
      } catch (error) {
        console.error("Failed to fetch feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-circle-outline" size={40} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});

export default FeedScreen;
