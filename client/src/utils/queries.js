import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  getMe {
    id
    userName
    handle
    firstName
    email
    profilePicture
  }
}`;

export const QUERY_ALL_USERS = gql`
query getAllUsers {
  getAllUser {
    id
    userName
    firstName
    lastName
    email
    profilePicture
  }
}`;

export const QUERY_USER = gql`
query getUser ($userId: ID) {
  getUser (userId: $userId) {
    userName
    handle
    email
    profilePicture
  }
}`;

export const QUERY_MY_FRIENDS = gql`
query getMyFriends {
  getMyFriends {
    id
    userName
    handle
    profilePicture
  }
}`;

export const QUERY_USER_FRIENDS = gql`
query getUserFriends($userId: ID!) {
  getUserFriends(userId: $userId) {
    id
    userName
  }
}`;

export const QUERY_MY_THOUGHTS = gql`
query getMyThoughts {
  getMyThoughts {
    id
    userId
    content
    user {
      userName
    }
  }
}`;

export const QUERY_ALL_THOUGHTS = gql`
query getAllThoughts {
  getAllThoughts {
    id
    userId
    content
    user {
      id
      userName
    }
  }
}`;

export const QUERY_ALL_LIKED = gql`
query getAllLiked {
  getAllLiked {
    thoughtId
    likedByUserId
  }
}`;

export const QUERY_THOUGHT = gql`
query getThought($thoughtId: ID!) {
  getThought(thoughtId: $thoughtId) {
    id
    content
    user{
      id
      userName
      handle
    }
  }
}`;

export const QUERY_THOUGHT_LIKES = gql`
query getThoughtLikes ($thoughtId: ID!) {
  getThoughtLikes(thoughtId: $thoughtId) {
    id
    content
    user{
      id
      userName
      handle
    }
  }
}`;


export const QUERY_USER_THOUGHTS = gql`
query getUserThoughts ($userId: ID!) {
  getUserThoughts (userId: $userId) {
    id
    content
    user{
      userName
      handle
    }
  }
}`;

export const QUERY_REPLYS = gql`
query getThoughtReplys ($thoughtReplyOfId: ID!) {
  getThoughtReplys(thoughtReplyOfId: $thoughtReplyOfId) {
    id
    content
    user{
      id
      userName
      handle
    }
  }
}`;

export const QUERY_RETHOUGHTS = gql`
query getThoughtReThoughts ($originalThoughtId: ID!) {
  getThoughtReThoughts(originalThoughtId: $originalThoughtId) {
    content
    user{
      userName
      handle
    }
  }
}`;

export const QUERY_MY_RETHOUGHTS = gql`
query getMyReThoughts {
  getMyReThoughts {
    id
    userId
    content
    user{
      userName
      handle
    }
  }
}`;

export const QUERY_MY_LIKED = gql`
query getAllMyLiked {
  getAllMyLiked {
    id
    userId
    content
    user {
      id
      userName
      handle
    }
  }
}`;

export const QUERY_USER_LIKED = gql`
query getUserLiked ($userId: ID!) {
  getUserLiked (userId: $userId) {
    id
    userId
    content
    user {
      id
      userName
      handle
    }
  }
}`;


export const QUERY_USER_RETHOUGHTS = gql`
query getUserReThoughts ($userId: ID!)  {
  getUserReThoughts (userId: $userId) {
    id
    userId
    content
    user{
      userName
      handle
    }
  }
}`;

export const QUERY_ALL_RETHOUGHT_IDS = gql`
query getAllReThoughtIds {
  getAllReThoughtIds {
    reThoughtOfId
    reThoughtThoughtId
  }
}`;

export const QUERY_ALL_REPLY_IDS = gql`
query getAllReplyIds {
  getAllReplyIds {
    replyOfId
    replyThoughtId
  }
}`;
