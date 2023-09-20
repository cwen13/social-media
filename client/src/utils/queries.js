// graphql query file
import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUser($user: ID) {
    user(user: $user) {
      _id
      username
      firstName
      lsatName
      email
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  {
    thoughts {
      _id
      userId
      content
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
