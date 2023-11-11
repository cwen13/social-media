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
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      userName: $userName
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
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
  updateThought(id: $thoughtId,
                content: $content) {
thought {
                  id
                  content
      }
  }
}`;


export const REMOVE_THOUGHT = gql`
mutation removeThought($thoughtId: ID!) {
  removeThought(thoughtId: $thoughtId)
}`;



export const ADD_FRIEND = gql`
mutation addFriend($userId: ID!
                   $friendId: ID!
                   $sent: String!) {
  addFriend(userId: $userId
            friendId: $friendId
            sent: $sent) {
    friend {
      userId
      friendId
      sent
    }
  }
}
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($friendshipId: ID!) {
  removeFriend(id: $friendshipId){
    friend{
      id
    }
  }
}
`;

