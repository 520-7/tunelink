// src/screens/EditProfile.tsx
import React, { useEffect, useState } from "react";
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
import { RouteProp } from "@react-navigation/native";

type EditProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditProfile"
>;

type EditProfileScreenRouteProp = RouteProp<RootStackParamList, "EditProfile">;

interface Props {
  navigation: EditProfileScreenNavigationProp;
  route: EditProfileScreenRouteProp;
}

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;
const EditProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const userId = route.params.userId;
  const [profilename, setProfileName] = useState<string>("");
  const [profileDescription, setProfileDescription] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genres = [
    "Pop",
    "Rock",
    "R&B",
    "Hip-hop",
    "EDM",
    "Classical",
    "Jazz",
    "Country",
    "Blues",
    "Reggae",
    "Metal",
    "Folk",
    "Soul",
    "Techno",
    "Disco",
  ];

  useEffect(() => {
    const updateValues = async () => {
      const existingUser = await fetch(
        `http://${SERVERIP}:${SERVERPORT}/api/user/${userId}`
      );
      if (!existingUser.ok) {
        throw new Error(
          `Error fetching user ${userId}: ${existingUser.statusText}`
        );
      }
      const existingUserJson = await existingUser.json();
      setProfileName(existingUserJson.profileName);
      setProfileDescription(existingUserJson.profileDescription);
      setSelectedGenres(existingUserJson.genres);
    };
    updateValues();
  }, [userId]);

  const handleUpdateProfile = async () => {
    console.log("Updating profile");
    const existingUser = await fetch(
      `http://${SERVERIP}:${SERVERPORT}/api/user/${userId}`
    );
    if (!existingUser.ok) {
      throw new Error(
        `Error fetching user ${userId}: ${existingUser.statusText}`
      );
    }

    console.log(selectedGenres);
    console.log(profileDescription);
    console.log(profilename);
    const existingUserJson = await existingUser.json();
    const updatedUser = {
      ...existingUserJson,
      genres: selectedGenres,
      profileName: profilename,
      profileDescription: profileDescription,
    };

    console.log(updatedUser);

    const updateUser = await fetch(
      `http://${SERVERIP}:${SERVERPORT}/api/user/${userId}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!updateUser.ok) {
      throw new Error(
        `Error updating user ${userId}: ${updateUser.statusText}`
      );
    }
    navigation.navigate("Profile", { userId });
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const isSelected = (genre: string) => selectedGenres.includes(genre);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Profile Name"
            textColor="#FFFFFF"
            value={profilename}
            onChangeText={setProfileName}
            mode="outlined"
            placeholder="Enter your Profile Name"
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
          />
          <TextInput
            label="Profile Description"
            textColor="#FFFFFF"
            value={profileDescription}
            onChangeText={setProfileDescription}
            mode="outlined"
            placeholder="Enter your Profile Description"
            style={styles.input}
            multiline
            numberOfLines={4}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }}
          />
          <View style={styles.genreContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genreButton,
                  isSelected(genre) && styles.genreButtonSelected,
                ]}
                onPress={() => toggleGenre(genre)}
              >
                <Text
                  style={[
                    styles.genreButtonText,
                    isSelected(genre) && styles.genreButtonTextSelected,
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={handleUpdateProfile}
            style={styles.signupButton}
            labelStyle={styles.signupButtonText}
          >
            Update Profile
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  greenGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "rgba(168, 235, 18, 0.2)", // Lime green with transparency
    borderRadius: 150, // Circle shape
    top: -100,
    left: -100,
    opacity: 0.7, // Set opacity for a softer glow
    shadowColor: "#A8EB12",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50, // Create a glow effect by spreading the shadow
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 40,
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#A8EB12",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  genreButton: {
    backgroundColor: "#4D4D4D", // Dark gray for unselected
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 10,
    flexGrow: 1, // Allow buttons to grow and fill the space in rows with fewer buttons
    alignItems: "center", // Center the text in the button
  },
  genreButtonSelected: {
    backgroundColor: "#A8EB12", // Neon green when selected
  },
  genreButtonText: {
    color: "#FFFFFF", // White text for unselected
  },
  genreButtonTextSelected: {
    color: "#000000", // Black text when selected
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  imagePlaceholder: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  input: {
    marginBottom: 24,
    backgroundColor: "#1a1a1a",
    color: "#FFFFFF",
  },
  signupButton: {
    backgroundColor: "#A8EB12",
    marginTop: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signupButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
