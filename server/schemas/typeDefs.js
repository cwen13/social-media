const { gql } = require('apollo-server-express');

const typeDefs = gql`
enum SENT {
  sent
  denied
  mutual
  blocked
}

type User {
  id: ID!
  username: String!
  firstName: String!
  lastName: String!
  email: String!
  passwod: String!
}

type Friend {
  id : ID!
  userSentId: ID!
  iserReceivedId: ID!
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

type Auth {
  token: ID!
  user: User
}

type Query {
    me: User!
    users: [User]!
    user(email: String!): User
    userThoughts(id: ID!): [Thought]!

}

type Mutation {
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
    deleteUser(userId: ID!): User
    login(email: String!, password: String!): Auth
    addThought(userId: ID!, content: String!): Thought
    updateThought(id: ID!, content: String!): Thought
    addComment(thoughtId: ID!, userId: ID!, comment: String!): Comment
    updateComment(id: ID!, comment: String!): Comment
    addFriend(userSentId: ID!, userReceivedId: ID! sent: String! ): Friend
    removeFriend(friendId: ID!): Friend
}
`;

module.exports  = typeDefs;
 
