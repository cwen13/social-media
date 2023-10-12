// grapql mutations
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        id
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
  mutation addThought($thought: [ID]!) {
    addThought(thoughts: $thought) {
thought{
userId
content
}
    }
  }
`;

export const UPDATE_THOUGHT = gql`
mutation updateThought($thoughtId: ID! $content: String!) {
  updateThought(id: $thoughtId,
                content: $content) {
thought {
                  id
                  content
      }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($userId: ID!
                    $thoughtId: ID!
                    $comment: String!) {
addComment(userId: $userId
           thouhghtId: $thoughtId
           comment: $comment) {
comment {
     id
     userId
}
}
}
`;

export const UPDATE_COMMENT = gql`
mutation updateComment($userId: ID!
                    $thoughtId: ID!
                    $comment: String!) {
updateComment(userId: $userId
           thouhghtId: $thoughtId
           comment: $comment) {
comment {
     id
     userId
}
}
}
`;

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

