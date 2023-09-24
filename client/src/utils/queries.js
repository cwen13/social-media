// graphql query file
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    user {
      id
    }
  }
`

export const QUERY_USERS = gql`
  query getUsers {
    user {
      id
      username
      firstName
      lsatName
      email
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getAllThoughts {
    thoughts {
      id
      userId
      content
    }
  }
`;


export const QUERY_USER_THOUGHTS = gql`
  query getUserThoughts($userId: ID!){
    thought(id: $userId) {
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
`
