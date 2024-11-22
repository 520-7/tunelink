import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList, UserComment } from "../navigation/RootStackParamList";

type CommentScreenRouteProp = RouteProp<RootStackParamList, "CommentScreen">;

const CommentScreen = () => {
  const route = useRoute<CommentScreenRouteProp>();
  const { postId, comments: initialComments } = route.params;

  const [comments, setComments] = useState<UserComment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleUserComment = () => {
    if (newComment.trim()) {
      const newCommentObject: UserComment = {
        username: "You",
        text: newComment.trim(),
      };

      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => `${postId}-${index}`}
        renderItem={({ item }: { item: UserComment }) => (
          <View style={styles.comment}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="#999"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleUserComment}>
          <Ionicons name="send" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    color: "#fff",
    marginRight: 5,
  },
  text: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#333",
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
});

export default CommentScreen;
