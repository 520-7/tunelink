import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

const { width} = Dimensions.get('window');

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
interface Props {
  navigation: ProfileScreenNavigationProp;
}


const ProfileScreen: React.FC<Props> =  ({navigation}) => {
// Mock user data
  const user = {
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    username: 'User456',
    bio: 'UMass 25',
    followers: 9999999,
    following: 1,
  };

  // Mock post data
  const posts = [
    { id: '1', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '2', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '3', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '4', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '5', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '6', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '7', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '8', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '9', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '10', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '11', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '12', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '13', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '14', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '15', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '16', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '17', imageUri: require('../../assets/sample_album_cover.png') },
    { id: '18', imageUri: require('../../assets/sample_album_cover.png') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.userAvatar}} style={styles.avatar} />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      {/* Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      {/* Followers/Following Section */}
      <View style={styles.followSection}>
        <Text style={styles.followInfo}>Followers: {user.followers}</Text>
        <Text style={styles.followInfo}>Following: {user.following}</Text>
      </View>

      {/* User Posts Grid */}
      <View style={{ flex: 1 }}>
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.gridItem}>
                    <Image source={item.imageUri} style={styles.gridImage} />
                </TouchableOpacity>
            )}
            style={styles.grid}
        />
        </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Feed')}>
          <Ionicons name="musical-notes" size={30} color="#A8EB12" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MakePost')}>
          <Ionicons name="add-circle" size={70} color="#A8EB12" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/30.jpg' }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    header: {
      alignItems: 'center',
      marginTop: 50,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        transform: [{ translateX: 160 }, { translateY: 20 }],
    },
    
    username: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    location: {
      color: '#aaa',
      fontSize: 18,
    },
    bioSection: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    bio: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
    followSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    followInfo: {
      color: '#fff',
      fontSize: 18,
    },
    grid: {
      marginTop: 20,
    },
    gridItem: {
      flex: 1,
      margin: 5,
      height: width / 3, // This keeps the grid items square
    },
    gridImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    footer: {
      height: 80,
      backgroundColor: '#000',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderTopColor: '#4D4D4D',
      borderTopWidth: 1,
    },
    iconButton: {
      padding: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 20,
      },
  });
  
  export default ProfileScreen;
  