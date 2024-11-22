// src/navigation/RootStackParamList.ts

export type RootStackParamList = {
  Splash: undefined;
  Signup: undefined;
  Onboarding: { 
    userId: string;
  };
  Login: undefined;
  Feed: { 
    userId: string;
  };
  Profile: { 
    userId: string;
  };
  MakePost: { 
    userId: string;
  };
  SinglePostScreen: {
    postId: string;
  };
  CommentScreen: {
    postId: string;
    comments: UserComment[];
  };
};

export interface UserComment {
  username: string;
  text: string;
}

interface PostProps {
  post: {
    id: string;
    userAvatar: string;
    username: string;
    timestamp: string;
    location: string;
    videoUri: string;
    description: string;
    comments: UserComment[];
  };
  isCurrent: boolean;
  onCommentPress?: (postId: string, comments: UserComment[]) => void;
}