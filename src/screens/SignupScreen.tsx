
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { ResponseType } from 'expo-auth-session';

import * as AuthSession from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
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

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  // Generate the redirect URI
  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: 'tunelink', // Use your defined scheme
  });
  console.log('Redirect URL:', redirectUrl); // This should log a proper URL

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '891818434642-6mnb9kcg6v31c0ckc6ovpct4fcc8t07e.apps.googleusercontent.com',
    redirectUri: redirectUrl, // Use the generated redirect URL
  });

  const handleGoogleSignup = async () => {
    try {
      const result = await promptAsync();
      if (result.type === 'success') {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        console.log('User signed up:', userCredential.user);
        navigation.navigate('Onboarding');
      }
    } catch (error) {
      console.error('Error during Google sign up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/app-logo.png')} style={styles.logo} />
      </View>
      
      <View style={styles.formContainer}>
        <Button 
          mode="contained" 
          onPress={handleGoogleSignup} 
          style={styles.googleButton}
          disabled={!request}
        >
          Sign up with Google
        </Button>

        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Already have an account? Log in
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 150,
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1.4,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    marginTop: 20,
  },
  link: {
    color: '#A8EB12',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignupScreen;