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
    thoughts: [Thought]!
    userThoughts(userId: ID!): [Thought]!
    friends: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
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
    updateThought(id: ID!, content: String!): Thought
    updateComment(id: ID!, comment: String!): Comment
    removeFriend(friendId: ID!): Friend
    deleteUser(userId: ID!): User
    addThought(userId: ID!, content: String!): Thought
    addComment(thoughtId: ID!, userId: ID!, comment: String!): Comment
    addFriend(userId: ID!, friendId: ID! sent: String! ): Friend
}
`;

module.exports  = typeDefs;
 

// commenting out for now

