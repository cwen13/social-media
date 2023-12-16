// grapql mutations
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
      }
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $userName: String!
    $handle: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      userName: $userName
      firstName: $firstName
      handle: $handle
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        id
        userName
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser(
    $userId: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
user {
id
userName
  }
}
}
`

export const DELETE_USER = gql`
mutation deleteUser($userId: ID!) {
  deleteUser(id: $userId) {
user {
    id
    userName
    email
}
 }
}
`;

export const ADD_THOUGHT = gql`
  mutation addThought($userId: ID!, $content: String!, $thoughtReplyOfId: ID) {
    addThought (userId: $userId, content: $content, thoughtReplyOfId: $thoughtReplyOfId) {
      id
      userId
      content
      user {
        userName
      }
    }
  }`;

export const UPDATE_THOUGHT = gql`
mutation updateThought($thoughtId: ID! $content: String!) {
  updateThought(thoughtId: $thoughtId,
                content: $content) {
                  id
                  content
                  user{
                    userName
                    handle
                  }
                }
}`;

export const REMOVE_THOUGHT = gql`
mutation removeThought($thoughtId: ID!) { removeThought(thoughtId: $thoughtId) }`;

export const ADD_FRIEND = gql`
mutation addFriend($friendId: ID!) {
  addFriend(friendId: $friendId) 
}`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($friendshipId: ID!) {
  removeFriend(id: $friendshipId)
}`;

export const ADD_LIKED = gql`
mutation addLiked($thoughtId: ID!) { addLiked(thoughtId: $thoughtId) }`;

export const REMOVE_LIKED = gql`
mutation removeLiked($thoughtId: ID!) { removeLiked(thoughtId: $thoughtId) }`;

export const REPLY_TO_THOUGHT = gql`
mutation replyToThought($content: String!, $thoughtId: ID!) {
  replyToThought (content: $content, thoughtId: $thoughtId) {
    id
    replyOfId
    replyThoughtId
  }
}`;

export const RETHOUGHT_THOUGHT = gql`
mutation addReThought ($originalThoughtId: ID!,
                       $additionalThought: String) {
  addReThought (originalThoughtId: $originalThoughtId,
                additionalThought: $additionalThought) {
    reThoughtOfId
    reThoughtThoughtId
 }
}`;

export const ADD_FOLLOW = gql`
mutation addFollow($followingId: ID!) {
  addFollow(followingId: $followingId) 
}`;

export const REMOVE_FOLLOW = gql`
mutation removeFollow($followingId: ID!) {
  removeFollow(id: $followingId)
}`;

export const ADD_BLOCKED = gql`
mutation addBlocked($blockedId: ID!) {
  addBlocked(blockedId: $blockedId)
}`;

export const REMOVE_BLOCKED = gql`
mutation removeBlocked($blockedId: ID!) {
  removeBlocked(blockedId: $blockedId)
}`;
