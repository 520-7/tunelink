import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video, Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;

interface PostProps {
  post: {
    _id: string;
    ownerUser: string;
    likesCount: number;
    timestamp: string;
    albumCoverUrl: string;
    audioUrl: string;
    caption: string;
    userAvatarUrl: string;
    userName: string;
  };
  isCurrent: boolean; // Indicates if this post is currently visible
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const PostComponent: React.FC<PostProps> = ({ post, isCurrent }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likesCount);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Mute/Unmute functionality
  const toggleMute = async () => {
    setIsMuted((prev) => !prev);
    if (soundRef.current) {
      await soundRef.current.setStatusAsync({ isMuted: !isMuted });
    }
  };

  // Like functionality
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  // Load and control the audio based on the visibility of the post
  useEffect(() => {
    const loadAndControlAudio = async () => {
      if (isCurrent) {
        if (!soundRef.current) {
          // Load the audio if it's not already loaded
          const { sound } = await Audio.Sound.createAsync(
            {
              uri: `http://${SERVERIP}:${SERVERPORT}/api/files/audio/${post.audioUrl}`,
            },
            { shouldPlay: true }
          );
          soundRef.current = sound;
          if (isMuted) {
            await sound.setStatusAsync({ isMuted: !isMuted });
          }
        } else {
          // Resume playing if the audio is already loaded
          await soundRef.current.playAsync();
        }
      } else {
        // Pause the audio if the post is not visible
        if (soundRef.current) {
          await soundRef.current.pauseAsync();
        }
      }
    };

    loadAndControlAudio();

    // Unload the audio when the component unmounts
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [isCurrent, isMuted, post.audioUrl]);

  // const [isMuted, setIsMuted] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  // const [likes, setLikes] = useState(post.likesCount);
  // const [sound, setSound] = useState<Audio.Sound | null>(null);

  // const soundRef = useRef<Audio.Sound | null>(null);

  // // Mute/Unmute functionality
  // const toggleMute = async () => {
  //   setIsMuted((prev) => !prev);
  //   if (sound) {
  //     await sound.setIsMutedAsync(!isMuted);
  //   }
  // };

  // // Like functionality
  // const handleLike = () => {
  //   setIsLiked(!isLiked);
  //   setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  // };

  // // Load the audio when the component mounts
  // useEffect(() => {
  //   const loadAudio = async () => {
  //     // Unload any existing sound
  //     if (soundRef.current) {
  //       await soundRef.current.unloadAsync();
  //       soundRef.current = null;
  //       setSound(null);
  //     }

  //     // Load the new sound
  //     const { sound: newSound } = await Audio.Sound.createAsync(
  //       {
  //         uri: `http://${SERVERIP}:${SERVERPORT}/api/files/audio/${post.audioUrl}`,
  //       },
  //       { shouldPlay: isCurrent }
  //     );
  //     soundRef.current = newSound;
  //     setSound(newSound);
  //   };

  //   loadAudio();

  //   // Unload the sound when the component unmounts or when post.audioUrl changes
  //   return () => {
  //     if (soundRef.current) {
  //       soundRef.current.unloadAsync();
  //     }
  //   };
  // }, [post.audioUrl]);

  // // Play/pause the audio when the post becomes visible/invisible
  // useEffect(() => {
  //   const controlAudio = async () => {
  //     if (isCurrent && sound) {
  //       await sound.playAsync();
  //     } else if (sound) {
  //       await sound.pauseAsync();
  //     }
  //   };

  //   controlAudio();
  // }, [isCurrent, sound]);

  return (
    <View style={styles.container}>
      {/* Album cover as background */}
      <Image
        source={{
          uri: `http://${SERVERIP}:${SERVERPORT}/api/files/albumCover/${post.albumCoverUrl}`,
        }}
        style={styles.albumCover}
        resizeMode="cover"
      />

      {/* Overlay elements */}
      <View style={styles.overlay}>
        {/* Left side: User info and caption */}
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.userInfo}>
            <Image
              source={{ uri: post.userAvatarUrl }}
              style={styles.profilePic}
            />
            <Text style={styles.username}>{post.userName}</Text>
          </TouchableOpacity>
          <Text style={styles.description}>{post.caption}</Text>
        </View>

        {/* Right side: Action buttons */}
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={40}
              color={isLiked ? "red" : "#fff"}
            />
            <Text style={styles.actionLabel}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={toggleMute}>
            <Ionicons
              name={isMuted ? "volume-mute" : "volume-high"}
              size={30}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionLabel: {
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
  },
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "relative",
    backgroundColor: "#000",
  },
  albumCover: {
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
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 10,
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
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
});

export default PostComponent;
