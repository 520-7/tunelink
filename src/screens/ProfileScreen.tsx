import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";
import { RouteProp } from "@react-navigation/native";

const { width } = Dimensions.get("window");

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;
type ProfleScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;

interface Props {
  navigation: ProfileScreenNavigationProp;
  route: ProfleScreenRouteProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const [user, setUser] = useState({
    _id: "",
    userName: "",
    profileName: "",
    followerCount: 0,
    following: [{}],
    totalLikeCount: 0,
    profileDescription: "",
    genres: [] as string[],
    ownedPosts: [{}],
    userAvatarUrl: "",
  });

  const userId = route.params.userId;

  const getUser = async (userId: string) => {
    try {
      const response = await fetch(
        `http://${SERVERIP}:${SERVERPORT}/api/user/${userId}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();

      if (response.ok) {
        console.log("successfully retrieved user");
        setUser(responseData);
      } else {
        console.error("Server error:", response);
      }
    } catch (error) {
      console.error("Network request failed:", error);
    }
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  const posts = [
    {
      id: "1",
      albumCoverUri: "https://via.placeholder.com/350x250",
      title: "Just discovered this amazing track! 😍",
      datePosted: "2024-10-17",
    },
    {
      id: "2",
      albumCoverUri: "https://via.placeholder.com/350x250",
      title: "This song is so chill! 🎧",
      datePosted: "2024-10-16",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri:
              user.userAvatarUrl ||
              "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user.userName}</Text>
      </View>

      {/* Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.bio}>{user.profileDescription}</Text>
      </View>

      {/* Followers/Following Section */}
      <View style={styles.followSection}>
        <View style={styles.followCard}>
          <Text style={styles.followCount}>
            {user.followerCount.toLocaleString()}
          </Text>
          <Text style={styles.followLabel}>Followers</Text>
        </View>
        <View style={styles.followCard}>
          <Text style={styles.followCount}>
            {user.following.length.toLocaleString()}
          </Text>
          <Text style={styles.followLabel}>Following</Text>
        </View>
      </View>

      {/* User Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image
              source={{ uri: item.albumCoverUri }}
              style={styles.albumCover}
            />
            <View style={styles.textContainer}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postDate}>{item.datePosted}</Text>
            </View>
          </View>
        )}
        style={styles.postList}
        contentContainerStyle={styles.postListContent}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Feed", { userId })}
        >
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
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bio: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  followSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  followCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  followCount: {
    color: "#A8EB12",
    fontSize: 24,
    fontWeight: "bold",
  },
  followLabel: {
    color: "#fff",
    fontSize: 14,
  },
  postList: {
    flex: 1,
  },
  postListContent: {
    paddingBottom: 100, // Add some padding at the bottom for the footer
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#4D4D4D",
    borderBottomWidth: 1,
    borderRadius: 10, // Rounded corners
    backgroundColor: "#1a1a1a", // Background for posts
    marginHorizontal: 10,
    marginVertical: 5,
  },
  albumCover: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  postTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postDate: {
    color: "#ccc",
    fontSize: 12,
  },
  footer: {
    height: 80,
    backgroundColor: "#000",
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

export default ProfileScreen;
