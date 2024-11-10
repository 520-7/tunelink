// src/screens/Onboarding.tsx

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParamList";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;
type OnboardingScreenRouteProp = RouteProp<RootStackParamList, "Onboarding">;

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;

interface Props {
  navigation: OnboardingScreenNavigationProp;
  route: OnboardingScreenRouteProp;
}

const OnboardingScreen: React.FC<Props> = ({ navigation, route }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const userId = route.params.userId;

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

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleContinue = async () => {
    try {
      const updateUserData = {
        genres: selectedGenres,
      };

      const response = await fetch(
        `http://${SERVERIP}:${SERVERPORT}/api/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUserData),
        }
      );

      console.log(JSON.stringify(updateUserData));
      console.log(response);
      if (response.ok) {
        navigation.navigate("Feed", { userId });
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Network request failed:", error);
    }
  };

  const isSelected = (genre: string) => selectedGenres.includes(genre);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Green Light Glow Effect */}
      <View style={styles.greenGlow} />

      <Text style={styles.title}>Select Your Favorite Music Genres</Text>
      <Text style={styles.subtitle}>Select all that apply</Text>

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
        onPress={handleContinue}
        style={styles.continueButton}
      >
        Continue
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#000000", // Black background
  },
  // Green Glow Effect
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
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "white", // White text for the title
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#A8EB12", // Lime green text for the subtitle
    marginBottom: 20,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap the buttons to the next row when necessary
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
  continueButton: {
    backgroundColor: "#4D4D4D", // Dark gray button
    marginTop: 20,
  },
});

export default OnboardingScreen;
