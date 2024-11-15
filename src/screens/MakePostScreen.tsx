// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { TextInput, Button } from "react-native-paper";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../navigation/RootStackParamList";
// import { RouteProp } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker";

// type MakePostScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "MakePost"
// >;
// type MakePostScreenRouteProp = RouteProp<RootStackParamList, "MakePost">;

// interface Props {
//   navigation: MakePostScreenNavigationProp;
//   route: MakePostScreenRouteProp;
// }

// const MakePostScreen: React.FC<Props> = ({ navigation, route }) => {
//   const userId = route.params.userId;

//   const [caption, setCaption] = useState<string>("");
//   const [image, setImage] = useState<any>(null);
//   const [audio, setAudio] = useState<any>(null);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0]);
//     }
//   };

//   const pickAudio = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "audio/*",
//     });

//     if (result.type !== "cancel") {
//       setAudio(result);
//     }
//   };

//   const uploadPost = async () => {
//     console.log("Uploading Post", caption, image, audio);
//     navigation.navigate("Feed", { userId });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Create a New Post</Text>

//       {/* Image Picker */}
//       <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//         {image ? (
//           <Image source={{ uri: image.uri }} style={styles.imagePreview} />
//         ) : (
//           <Text style={styles.imagePickerText}>Select Image</Text>
//         )}
//       </TouchableOpacity>

//       {/* Audio Picker */}
//       <TouchableOpacity style={styles.audioPicker} onPress={pickAudio}>
//         <Text style={styles.audioText}>
//           {audio ? audio.name : "Select Audio"}
//         </Text>
//         <View style={styles.audioWave}>
//           <View style={styles.waveLine}></View>
//           <View style={[styles.waveLine, styles.tall]}></View>
//           <View style={styles.waveLine}></View>
//           <View style={[styles.waveLine, styles.tall]}></View>
//           <View style={styles.waveLine}></View>
//         </View>
//       </TouchableOpacity>

//       {/* Caption Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Write a caption..."
//         value={caption}
//         onChangeText={setCaption}
//         mode="outlined"
//         theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
//       />

//       <Button onPress={uploadPost} style={styles.postButton}>
//         Upload Post
//       </Button>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000",
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     color: "#A8EB12",
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   imagePicker: {
//     height: 150,
//     backgroundColor: "#1a1a1a",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#A8EB12",
//   },
//   imagePickerText: {
//     color: "#A8EB12",
//     fontSize: 16,
//   },
//   imagePreview: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   audioPicker: {
//     backgroundColor: "#4D4D4D",
//     borderRadius: 5,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   audioText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//   },
//   audioWave: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 10,
//   },
//   waveLine: {
//     width: 5,
//     height: 10,
//     backgroundColor: "#A8EB12",
//     marginHorizontal: 2,
//     borderRadius: 2,
//   },
//   tall: {
//     height: 20,
//   },
//   input: {
//     backgroundColor: "#1a1a1a",
//     marginBottom: 20,
//     color: "#FFFFFF",
//   },
//   postButton: {
//     backgroundColor: "#A8EB12",
//     borderRadius: 5,
//     paddingVertical: 10,
//   },
// });

// export default MakePostScreen;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
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

const MakePostScreen: React.FC<Props> = ({ navigation, route }) => {
  const userId = route.params.userId;

  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);
  const [links, setLinks] = useState<{ source: string; url: string }[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });

    if (result.type !== "cancel") {
      setAudio(result);
    }
  };

  const addLink = () => {
    setLinks([...links, { source: "", url: "" }]);
  };

  const updateLink = (index: number, key: "source" | "url", value: string) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [key]: value } : link
    );
    setLinks(updatedLinks);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const uploadPost = async () => {
    console.log("Uploading Post", caption, image, audio, links);
    navigation.navigate("Feed", { userId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePickerText}>Select Image</Text>
        )}
      </TouchableOpacity>

      {/* Audio Picker */}
      <TouchableOpacity style={styles.audioPicker} onPress={pickAudio}>
        <Text style={styles.audioText}>
          {audio ? audio.name : "Select Audio"}
        </Text>
        <View style={styles.audioWave}>
          <View style={styles.waveLine}></View>
          <View style={[styles.waveLine, styles.tall]}></View>
          <View style={styles.waveLine}></View>
          <View style={[styles.waveLine, styles.tall]}></View>
          <View style={styles.waveLine}></View>
        </View>
      </TouchableOpacity>

      {/* Caption Input */}
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        mode="outlined"
        theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
      />

      {/* Links Section */}
      <Text style={styles.sectionTitle}>Add Links</Text>
      {links.map((link, index) => (
        <View key={index} style={styles.linkContainer}>
          <TextInput
            style={styles.linkInput}
            placeholder="Source (e.g., YouTube)"
            value={link.source}
            onChangeText={(text) => updateLink(index, "source", text)}
            mode="outlined"
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
          />
          <TextInput
            style={styles.linkInput}
            placeholder="URL (e.g., https://example.com)"
            value={link.url}
            onChangeText={(text) => updateLink(index, "url", text)}
            mode="outlined"
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
          />
          <Button
            mode="outlined"
            onPress={() => removeLink(index)}
            style={styles.removeButton}
          >
            Remove
          </Button>
        </View>
      ))}
      <Button onPress={addLink} style={styles.addLinkButton}>
        Add Link
      </Button>

      <Button onPress={uploadPost} style={styles.postButton}>
        Upload Post
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#A8EB12",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  imagePicker: {
    height: 150,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#A8EB12",
  },
  imagePickerText: {
    color: "#A8EB12",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  audioPicker: {
    backgroundColor: "#4D4D4D",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  audioText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  audioWave: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  waveLine: {
    width: 5,
    height: 10,
    backgroundColor: "#A8EB12",
    marginHorizontal: 2,
    borderRadius: 2,
  },
  tall: {
    height: 20,
  },
  input: {
    backgroundColor: "#1a1a1a",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  linkInput: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#1a1a1a",
  },
  removeButton: {
    backgroundColor: "#d9534f",
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  addLinkButton: {
    backgroundColor: "#4D4D4D",
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 10,
  },
  postButton: {
    backgroundColor: "#A8EB12",
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 20,
  },
});

export default MakePostScreen;
