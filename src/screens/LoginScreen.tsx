// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  
  const handleLogin = () => {
    navigation.navigate('Onboarding');
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.navigate('Onboarding');
    } catch {
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/app-logo.png')} style={styles.logo} />
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          placeholder="Enter your email"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          placeholder="Enter your password"
          style={styles.input}
        />

        {/* <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
          Login
        </Button> */}

        <Button mode="outlined" onPress={handleGoogleSignIn} style={styles.loginButton}>
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
});

export default LoginScreen;