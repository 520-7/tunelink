// src/screens/LoginScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const firebaseConfig = {
  apiKey: "AIzaSyBuM-bpXVe2gYL0NFtpwOJnG1DC15xFWeI",
  authDomain: "tunelink-fe99c.firebaseapp.com",
  projectId: "tunelink-fe99c",
  storageBucket: "tunelink-fe99c.firebasestorage.app",
  messagingSenderId: "891818434642",
  appId: "1:891818434642:web:b9de0df8dd30f20d81ff8b",
  measurementId: "G-WHCH3K5FLC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '981133107700-rqi9fug0t7mkov2p2q7ivm6q2esgge0e.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log('User signed in');
          navigation.navigate('Onboarding');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/app-logo.png')} style={styles.logo} />
      </View>
      
      <View style={styles.formContainer}>
        <Button 
          mode="contained" 
          onPress={() => promptAsync()} 
          style={styles.googleButton}
          disabled={!request}
        >
          Sign in with Google
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background
    paddingTop: 150, // Add padding to move down contents slightly
  },
  logoContainer: {
    flex: 0.6, // Adjust logo container size to give space for the logo
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200, // Adjust the size as needed
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1.4, 
    paddingHorizontal: 16,
    justifyContent: 'flex-start', 
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
  },
  loginButton: {
    backgroundColor: '#4D4D4D', 
    marginTop: 20,
  },
  link: {
    color: '#A8EB12',
    textAlign: 'center',
    marginTop: 20,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    marginTop: 20,
  }
});

export default LoginScreen;