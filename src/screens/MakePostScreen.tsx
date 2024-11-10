import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

type MakePostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MakePost"
>;
type MakePostScreenRouteProp = RouteProp<RootStackParamList, "MakePost">;

interface Props {
  navigation: MakePostScreenNavigationProp;
  route: MakePostScreenRouteProp;
}

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;

const MakePostScreen: React.FC<Props> = ({ navigation, route }) => {
  const userId = route.params.userId;

  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [outLinks, setOutLinks] = useState<any>([]);
  const [audio, setAudio] = useState<any>([]);

  const addOutLink = () => {
    setOutLinks([...outLinks, { key: "", url: "" }]);
  };

  const updateOutLink = (index: number, key: string, value: string) => {
    const updatedOutLinks = outLinks.map((link, i) => {
      if (i === index) {
        return { ...link, [key]: value };
      }
      return link;
    });
    setOutLinks(updatedOutLinks);
  };

  const removeOutLink = (index: number) => {
    const updatedOutLinks = outLinks.filter((_, i) => i !== index);
    setOutLinks(updatedOutLinks);
  };

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });

    if (!result.canceled) {
      setAudio(result.assets[0]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const getBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadPost = async () => {
    console.log("Uploading Post");
    console.log(SERVERIP);
    console.log(SERVERPORT);
    console.log(caption);
    console.log(image);
    console.log(audio);
    console.log(outLinks);
    try {
      const formData = new FormData();
      formData.append("ownerUser", userId);
      formData.append("likesCount", "0");
      formData.append("caption", caption);
      formData.append(
        "outLinks",
        JSON.stringify(
          outLinks.reduce((acc, link) => {
            acc[link.key] = link.url;
            return acc;
          }, {})
        )
      );

      // Append audio file if it exists
      if (audio) {
        // const audioBlob = await getBlob(audio.uri);
        // console.log(audioBlob);
        const uri = audio.uri;
        let type = uri.substring(uri.lastIndexOf(".") + 1);
        formData.append("audio", {
          uri,
          name: "media",
          type: `image/${type}`,
        } as any);
      }

      // Append image file if it exists
      if (image) {
        // const imageBlob = await getBlob(image.uri);
        // console.log(imageBlob);
        const uri = image.uri;
        let type = uri.substring(uri.lastIndexOf(".") + 1);
        formData.append("albumCover", {
          uri,
          name: "media",
          type: `image/${type}`,
        } as any);
      }

      // Make the fetch request to upload the post
      const response = await fetch(
        `http://${SERVERIP}:${SERVERPORT}/api/upload/uploadPost`,
        {
          method: "POST",
          body: formData,
          headers: {
            // Don't set 'Content-Type' header, let the browser set it with the correct boundary
            // Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      // Reset the form state after successful upload
      setImage(null);
      setAudio(null);
      setCaption("");
      setOutLinks([]);
      navigation.navigate("Feed", { userId });
    } catch (error) {
      console.error("Error uploading post:", error);
      navigation.navigate("Feed", { userId });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Button
        onPress={pickImage}
        style={styles.addButton}
        labelStyle={styles.buttonLabel}
      >
        Pick Image
      </Button>
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      <Button
        onPress={pickAudio}
        style={styles.addButton}
        labelStyle={styles.buttonLabel}
      >
        Pick MP3
      </Button>
      {audio && <Text style={styles.audioText}>{audio.name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Write a caption"
        value={caption}
        textColor="white"
        onChangeText={setCaption}
      />
      {outLinks.map((link, index) => (
        <View key={index} style={styles.outLinkContainer}>
          <TextInput
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
            placeholder="Key (e.g., youtube)"
            value={link.key}
            textColor="white"
            onChangeText={(text) => updateOutLink(index, "key", text)}
          />
          <TextInput
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
            placeholder="URL"
            value={link.url}
            textColor="white"
            onChangeText={(text) => updateOutLink(index, "url", text)}
          />
          <Button
            onPress={() => removeOutLink(index)}
            style={styles.removeButton}
            labelStyle={styles.buttonLabel}
          >
            Remove
          </Button>
        </View>
      ))}
      <Button
        onPress={addOutLink}
        style={styles.addButton}
        labelStyle={styles.buttonLabel}
      >
        Add OutLink
      </Button>
      <View style={styles.buttonContainer}>
        <Button
          onPress={uploadPost}
          style={styles.postButton}
          labelStyle={styles.buttonLabel}
        >
          Upload Post
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
  buttonContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4D4D4D",
    color: "#ffffff",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 16,
  },
  removeButton: {
    backgroundColor: "#d9534f",
    color: "#ffffff",
    paddingVertical: 10,
    borderRadius: 5,
  },
  audioText: {
    color: "#FFFFFF",
    marginVertical: 16,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    borderRadius: 10,
    resizeMode: "contain",
  },
  outLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  uploadText: {
    color: "#A8EB12",
    marginTop: 10,
    textAlign: "center",
  },
  formContainer: {
    flex: 1.4,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
    color: "#FFFFFF",
  },
  postButton: {
    backgroundColor: "#A8EB12",
    marginTop: 20,
    color: "#ffffff",
    paddingVertical: 10,
    marginVertical: 16,
    borderRadius: 5,
  },
  purpleGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "rgba(157, 82, 255, 0.6)",
    borderRadius: 150,
    shadowColor: "#A8EB12",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    zIndex: -1,
  },
  buttonLabel: {
    color: "#ffffff",
  },
  link: {
    color: "#A8EB12",
    textAlign: "center",
    marginTop: 20,
  },
  uploadButton: {
    alignItems: "center",
  },
});

export default MakePostScreen;
