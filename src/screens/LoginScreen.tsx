// src/screens/LoginScreen.tsx

import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";

import { login } from "../services/authService";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    // For testing purposes remove later
    if (email === "test" && password === "test") {
      console.log("Logged in with test credentials");
      navigation.navigate("Feed", { userId: "testUserId" });
      return;
    }
    try {
      const responseData = await login(email, password);
      if (responseData && responseData.userId) {
        navigation.navigate("Feed", { userId: responseData.userId });
      } else {
        console.error("Login failed:", responseData);
      }
    } catch (error) {
      console.error("Network request failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/app-logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          label="Email"
          textColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          placeholder="Enter your email"
          style={styles.input}
        />
        <TextInput
          label="Password"
          textColor="#FFFFFF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          placeholder="Enter your password"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
        >
          Login
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Black background
    paddingTop: 150, // Add padding to move down contents slightly
  },
  logoContainer: {
    flex: 0.6, // Adjust logo container size to give space for the logo
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200, // Adjust the size as needed
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1.4,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
  },
  loginButton: {
    backgroundColor: "#4D4D4D",
    marginTop: 20,
  },
  link: {
    color: "#A8EB12",
    textAlign: "center",
    marginTop: 20,
  },
});

export default LoginScreen;
