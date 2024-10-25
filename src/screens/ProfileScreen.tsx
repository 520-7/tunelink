import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

const { width } = Dimensions.get('window');

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const user = {
    userAvatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    userName: 'User456',
    profileDescription: 'UMass 25',
    followerCount: 9999999,
    following: ['userId1'],
    totalLikeCount: 100,
    genres: ['Pop', 'Rock'],
    ownedPosts: ['1', '2'],
  };

  const posts = [
    {
      ownerUser: 'userId1',
      likesCount: 50,
      timestamp: '2024-10-17T10:00:00Z',
      albumCoverUrl: 'https://via.placeholder.com/350x250',
      audioUrl: 'https://example.com/audio/track1.mp3',
      caption: 'Just discovered this amazing track! 😍',
      outLinks: {
        spotify: 'https://spotify.com/track/1',
        youtube: 'https://youtube.com/watch?v=1',
      },
      id: '1',
      datePosted: '2024-10-17',
    },
    {
      ownerUser: 'userId1',
      likesCount: 30,
      timestamp: '2024-10-16T10:00:00Z',
      albumCoverUrl: 'https://via.placeholder.com/350x250',
      audioUrl: 'https://example.com/audio/track2.mp3',
      caption: 'This song is so chill! 🎧',
      outLinks: {
        spotify: '',
        youtube: '',
      },
      id: '2',
      datePosted: '2024-10-16',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.userAvatarUrl }} style={styles.avatar} />
        <Text style={styles.username}>{user.userName}</Text>
      </View>

      <View style={styles.followSection}>
        <View style={styles.followCard}>
          <Text style={styles.followCount}>{user.followerCount.toLocaleString()}</Text>
          <Text style={styles.followLabel}>Followers</Text>
        </View>
        <View style={styles.followCard}>
          <Text style={styles.followCount}>{user.following.length.toLocaleString()}</Text>
          <Text style={styles.followLabel}>Following</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.albumCoverUrl }} style={styles.albumCover} />
            <View style={styles.textContainer}>
              <Text style={styles.postTitle}>{item.caption}</Text>
              <Text style={styles.postDate}>{item.datePosted}</Text>
            </View>
          </View>
        )}
        style={styles.postList}
        contentContainerStyle={styles.postListContent}
      />

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
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
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
    marginBottom: 20,
  },
  followCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  followCount: {
    color: '#A8EB12',
    fontSize: 24,
    fontWeight: 'bold',
  },
  followLabel: {
    color: '#fff',
    fontSize: 14,
  },
  postList: {
    flex: 1,
  },
  postListContent: {
    paddingBottom: 100,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#4D4D4D',
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  albumCover: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  postTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDate: {
    color: '#ccc',
    fontSize: 12,
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
  addButton: {
    position: 'absolute',
    bottom: 30,
    transform: [{ translateX: 160 }, { translateY: 20 }],
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
});

export default ProfileScreen;
