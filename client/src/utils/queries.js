import { gql } from '@apollo/client';



export const QUERY_ME = gql`
query me {
  getMe {
    id
    userName
    handle
    firstName
    email
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
  }
}`;

export const QUERY_USER = gql`
query getUser ($userId: ID!) {
   getUser (userId: $userId) {
     userName
     handle
     email
   }
}`;

export const QUERY_MY_FRIENDS = gql`
query getMyFriends {
  getMyFriends {
    userId
    userNAme
    handle
  }
}`;

export const QUERY_USER_FRIENDS = gql`
query getUserFriends($userId: ID!) {
  getUserFriends(id: $userId) {
    userId
    friendId
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
    content
    user{
      userName
      handle
    }
  }
}`;

export const QUERY_THOUGHT_LIKES = gql`
query getThoughtLikes ($thoughtId: ID!) {
  getThoughtLikes(thoughtId: $thoughtId) {
    content
    user{
      userName
      handle
    }
  }
}`;


export const QUERY_USER_THOUGHTS = gql`
query getUserThoughts ($userId: ID!) {
    getUserThoughts (userId: $userId) {
    content
    user{
      userName
      handle
    }
  }
}`;

export const QUERY_REPLYS = gql`
query getReplys ($thoughtReplyOfId: ID!) {
  getReplys(thoughtReplyOfId: $thoughtReplyOfId) {
    content
    user{
      userName
      handle
    }
  }
}`;

export const QUERY_RETHOUGHTS = gql`
query getReThoughts ($originalThoughtId: ID!) {
  getReThoughts(originalThoughtId: $originalThoughtId) {
    content
    user{
      userName
      handle
    }
  }
}`;
 
