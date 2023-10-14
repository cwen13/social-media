// graphql query file
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      id
      userName
      firstName
      email
    }
  }
`
;
export const QUERY_USERS = gql`
  query getUsers {
    user {
      userName
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_USER = gql`
  query getUser ($userId: ID!) {
    user (id: $userId) {
      userName
      firstName
      lastName
      email
    }
}
`;

export const QUERY_ALL_THOUGHTS = gql`
  query getAllThoughts {
    getAllThoughts {
      id
      userId
      content
    }
  }
`;


export const QUERY_USER_THOUGHTS = gql`
  query getUserThoughts($userId: ID!){
    userThoughts(id: $userId) {
      id
      userId
    }
  }
`;

export const QUERY_USER_FRIENDS = gql`
query getUserFriends($userId: ID!) {
  friends(id: $userId) {
    userId
    friendId
    sent
  }
}
`;
