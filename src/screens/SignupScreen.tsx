// src/screens/SignupScreen.tsx

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

import { signup } from "../services/authService";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

const SERVERIP = process.env.EXPO_PUBLIC_SERVER_IP;
const SERVERPORT = process.env.EXPO_PUBLIC_SERVER_PORT;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profilename, setProfileName] = useState<string>("");
  const [profileDescription, setProfileDescription] = useState<string>("");
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSignup = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userName", username);
      formData.append("profileName", profilename);
      formData.append("profileDescription", profileDescription);

      if (image) {
        const uri = image.uri;
        let type = uri.substring(uri.lastIndexOf(".") + 1);
        const fileName = uri.split("/").pop();
        formData.append("userAvatar", {
          uri,
          name: fileName || "userAvatar",
          type: `image/${type}`,
        } as any);
      }

      const responseData = await signup(formData);

      if (responseData && responseData.userId) {
        console.log(responseData);
        navigation.navigate("Onboarding", { userId: responseData.userId });
      } else {
        console.error("Server error:", responseData.message);
      }
    } catch (error) {
      console.error("Network request failed:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/app-logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Button
            onPress={pickImage}
            style={styles.signupButton}
            labelStyle={styles.signupButton}
          >
            Pick Image
          </Button>
          {image && <Image source={{ uri: image.uri }} style={styles.image} />}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            placeholder="Enter your email"
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }} // Set white text and placeholder
            textColor="white"
          />
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            placeholder="Enter your username"
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }} // Set white text and placeholder
            textColor="white"
          />

          <TextInput
            label="Profle Name"
            value={profilename}
            onChangeText={setProfileName}
            mode="outlined"
            placeholder="Enter your Profile Name"
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }} // Set white text and placeholder
            textColor="white"
          />

          <TextInput
            label="Profle Description"
            value={profileDescription}
            onChangeText={setProfileDescription}
            mode="outlined"
            placeholder="Enter your Profile Description"
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }} // Set white text and placeholder
            textColor="white"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            placeholder="Enter your password"
            style={styles.input}
            theme={{ colors: { text: "#FFFFFF", placeholder: "#FFFFFF" } }} // Set white text and placeholder
            textColor="white"
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.signupButton}
          >
            Sign Up
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000000", // Black background
    // paddingTop: 150, // Move the content down further
    paddingBottom: 50,
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    borderRadius: 10,
    resizeMode: "contain",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1.4,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#1a1a1a", // Dark background for inputs
    color: "#FFFFFF", // White text
  },
  signupButton: {
    backgroundColor: "#4D4D4D",
    marginTop: 20,
  },
  link: {
    color: "#A8EB12",
    textAlign: "center",
    marginTop: 20,
  },
  purpleGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "rgba(157, 82, 255, 0.6)", // Purple color with transparency
    borderRadius: 150, // Circle shape
    shadowColor: "#A8EB12",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60, // Glow effect
    zIndex: -1, // Keep it behind the rest of the content
  },
});

export default SignupScreen;
