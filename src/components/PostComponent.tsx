import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { UserComment } from "../navigation/RootStackParamList";

interface PostProps {
  post: {
    id: string;
    userAvatar: string;
    username: string;
    timestamp: string;
    location: string;
    videoUri: string;
    description: string;
    comments: UserComment[];
  };
  isCurrent: boolean;
  onCommentPress: (postId: string, comments: UserComment[]) => void;
}

const PostComponent: React.FC<PostProps> = ({ post, isCurrent, onCommentPress }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(123);

  const toggleMute = () => setIsMuted((prev) => !prev);
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: post.videoUri }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={isCurrent}
        isLooping
        isMuted={isMuted}
      />

      <View style={styles.overlay}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.userInfo}>
            <Image source={{ uri: post.userAvatar }} style={styles.profilePic} />
            <Text style={styles.username}>{post.username}</Text>
          </TouchableOpacity>
          <Text style={styles.description}>{post.description}</Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={40}
              color={isLiked ? "red" : "#fff"}
            />
            <Text style={styles.actionLabel}>{likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onCommentPress(post.id, post.comments)}
          >
            <Ionicons name="chatbubble-outline" size={40} color="#fff" />
            <Text style={styles.actionLabel}>{post.comments.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 80,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 16,
  },
  rightContainer: {
    width: 60,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  actionButton: {
    marginBottom: 25,
    alignItems: "center",
  },
  actionLabel: {
    color: "#fff",
    marginTop: 5,
  },
});

export default PostComponent;
