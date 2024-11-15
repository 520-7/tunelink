import React, { useEffect, useState, useRef } from "react";
import {
  View,
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
import { Audio } from "expo-av";
import { ActivityIndicator } from "react-native";

type SinglePostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SinglePostScreen"
>;
type SinglePostRouteProp = RouteProp<RootStackParamList, "SinglePostScreen">;

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;

interface Props {
  navigation: SinglePostScreenNavigationProp;
  route: SinglePostRouteProp;
}

const SinglePostScreen: React.FC<Props> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({
    _id: "",
    ownerUser: "",
    likesCount: 0,
    timestamp: null,
    albumCoverUrl: "",
    audioUrl: "",
    caption: "",
    outLinks: [],
  });

  const [albumCover, setAlbumCover] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current.setOnPlaybackStatusUpdate(null);
        soundRef.current = null;
      }
    });

    return unsubscribe;
  }, [navigation]);

  const getPost = async (postId: string) => {
    setIsLoading(true);
    try {
      const postResponse = await fetch(
        `http://${SERVERIP}:${SERVERPORT}/api/post/${postId}`
      );

      if (!postResponse.ok) {
        throw new Error(`Error fetching post: ${postResponse.status}`);
      }

      const postData = await postResponse.json();
      console.log(JSON.stringify(postData));
      setPost(postData);

      if (postData.audioUrl !== "") {
        const audioResponse = await fetch(
          `http://${SERVERIP}:${SERVERPORT}/api/files/audio/${postData.audioUrl}`
        );
        if (!audioResponse.ok) {
          throw new Error(`Error fetching audio: ${audioResponse.status}`);
        }

        const audioBlob = await audioResponse.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAudio(base64data);
        };
        reader.readAsDataURL(audioBlob);
      }

      if (postData.albumCoverUrl !== "") {
        const albumCoverResponse = await fetch(
          `http://${SERVERIP}:${SERVERPORT}/api/files/albumCover/${postData.albumCoverUrl}`
        );
        if (!albumCoverResponse.ok) {
          throw new Error(
            `Error fetching album cover: ${albumCoverResponse.status}`
          );
        }

        const albumCoverBlob = await albumCoverResponse.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAlbumCover(base64data);
        };
        reader.readAsDataURL(albumCoverBlob);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    getPost(route.params.postId);
  }, [route.params?.postId]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#A8EB12" />
      ) : (
        <>
          {/* Album Cover */}
          {albumCover ? (
            <Image source={{ uri: albumCover }} style={styles.albumCover} />
          ) : (
            <View style={styles.placeholder}>
              <Text>No Album Cover Available</Text>
            </View>
          )}

          {/* Post Details */}
          <View style={styles.postDetails}>
            <Text style={styles.caption}>{post.caption}</Text>
            <Text style={styles.details}>
              {`Likes: ${post.likesCount} | Posted at: ${post.timestamp}`}
            </Text>
          </View>

          {/* Audio Player */}
          {audio ? (
            <TouchableOpacity
              style={styles.audioButton}
              onPress={async () => {
                try {
                  if (soundRef.current) {
                    if (isPlaying) {
                      // Check if the pauseAsync method is available before calling it
                      if (soundRef.current.pauseAsync) {
                        await soundRef.current.pauseAsync();
                        setIsPlaying(false);
                      }
                    } else {
                      // Check if the playAsync method is available before calling it
                      if (soundRef.current.playAsync) {
                        await soundRef.current.playAsync();
                        setIsPlaying(true);
                      }
                    }
                  } else {
                    const { sound } = await Audio.Sound.createAsync(
                      { uri: audio },
                      { shouldPlay: true }
                    );
                    soundRef.current = sound;
                    setIsPlaying(true);
                    sound.setOnPlaybackStatusUpdate((status) => {
                      if (status.didJustFinish) {
                        sound.unloadAsync();
                        soundRef.current = null;
                        setIsPlaying(false);
                      }
                    });
                  }
                } catch (error) {
                  console.error("Error playing audio:", error);
                }
              }}
            >
              {/* <Ionicons name="play-circle" size={50} color="#A8EB12" /> */}
              <Text style={styles.audioText}>Play Audio</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder}>
              <Text>No Audio Available</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  albumCover: {
    width: Dimensions.get("window").width * 0.9,
    height: 300,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 20,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 1,
    borderColor: "#4D4D4D",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#1a1a1a",
  },
  postDetails: {
    alignItems: "center",
    marginBottom: 20,
  },
  caption: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  details: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 15,
  },
  audioText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#A8EB12",
  },
});

export default SinglePostScreen;
