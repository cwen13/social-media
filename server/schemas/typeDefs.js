const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}

type Friend {
  id : ID!
  userId: ID!
  friendId: ID!
  sent: String!
}

type Thought {
  id: ID!
  userId: ID!
  content: String!
}

type Comment {
  id: ID!
  userId: ID!
  thoughtId: ID!
  comment: String!
}

type Auth {
  token: ID!
  user: User
}

type Query {
    me: User!
    users: [User]!
    user(id: ID!): User!
    userThoughts(userId: ID!): [Thought]!
    friends: [User]
}

type Mutation {
    addUser(username: String!,
            firstName: String!,
            lastName: String!,
            email: String!,
            password: String!): Auth
    updateUser(userId: ID!,
               username: String,
               firstName: String,
               lastName: String,
               email: String,
               password: String): User
    deleteUser(userId: ID!): User
    login(email: String!, password: String!): Auth
    addThought(userId: ID!, content: String!): Thought
    updateThought(id: ID!, content: String!): Thought
    addComment(thoughtId: ID!, userId: ID!, comment: String!): Comment
    updateComment(id: ID!, comment: String!): Comment
    addFriend(userId: ID!, friendId: ID! sent: String! ): Friend
    removeFriend(friendId: ID!): Friend
}
`;

module.exports  = typeDefs;
 
