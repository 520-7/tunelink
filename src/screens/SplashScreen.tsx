// src/screens/SplashScreen.tsx
import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList"; // Define your navigation types

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Signup");
    }, 2000); // Show the logo for 2 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/app-logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", // Black background
  },
  logo: {
    width: 200,
    height: 200, // Adjust the size of the logo based on your requirements
    resizeMode: "contain",
  },
});

export default SplashScreen;
