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
    thoughtReplyOfId
    isReThought
    originalThoughtId
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
    thoughtReplyOfId
    isReThought
    originalThoughtId
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
    thoughtReplyOfId
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
    thoughtReplyOfId
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
    thoughtReplyOfId
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
    isReThought
    originalThoughtId
    thoughtReplyOfId
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
    thoughtReplyOfId
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
    thoughtReplyOfId
    user {
      id
      userName
      handle
    }
  }
}`;


export const QUERY_USER_RETHOUGHT = gql`
query getUserReThoughts ($userId: ID!)  {
  getUserReThoughts (userId: $userId) {
    id
    userId
    content
    isReThought
    originalThoughtId
    thoughtReplyOfId
    user{
      userName
      handle
    }
  }
}`;

