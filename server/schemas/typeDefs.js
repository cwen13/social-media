const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  userName: String!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}

type Friend {
  id : ID!
  userId: String!
  friendId: String!
  sent: String!
}

type Thought {
  id: ID!
  userId: String!
  content: String!
}

type Comment {
  id: ID!
  userId: String!
  thoughtId: String!
  comment: String!
}

type Auth {
  token: ID!
  user: User
}

type Query {
    me: User!
    getUsers: [User]!
    user(id: ID!): User!
    getThought(id: ID!): Thought
    getAllThoughts: [Thought]!
    getUserThoughts(userId: ID!): [Thought]!
    getMyThoughts: [Thought]!
    friends: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userName: String!,
            firstName: String!,
            lastName: String!,
            email: String!,
            password: String!): Auth
    updateUser(userId: ID!,
               userName: String,
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
 


