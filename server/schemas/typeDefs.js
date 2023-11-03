const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  userName: String!
  handle: String!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  friends: [User]
  friendOfFriend: [User]
}

type Friend {
  id: ID!
  userId: ID!
  friendId: ID!
}

type Thought {
  id: ID!
  userId: ID!
  content: String!
  thoughtReplyOfId: ID
  user: User
}

type ReThought {
  id: ID!
  reThoughtByUserId: ID!
  originalThoughtId: ID!
  additionalThoughtId: ID!
  user: User!
  thought: Thought!

}

type Liked {
  id: ID!
  thoughtId: ID!
  likedByUserId: ID!
}

type Auth {
  token: ID!
  user: User!
}

type Query {
  me: User
  getUser(userId: ID!): User
  getAllUsers: [User!]!
  getFriends(userId: ID!): [User]

  getMyThoughts: [Thought]
  getThought(id: ID!): Thought
  getAllThoughts: [Thought!]!
  getUserThoughts(userId: ID!): [Thought]!

  getReplys(thoughtReplayOfId: ID!): [Thought]!
  getReThoughts(originalThoughtId: ID!): [ReThought]!
}

type Mutation {
  login(email: String!,
        password: String!): Auth!
  addUser(userName: String!,
          handle: String!,
          firstName: String!,
          lastName: String!,
          email: String!,
          password: String!): Auth!
  updateUser(userId: ID!,
             userName: String,
             handle: String,
             firstName: String,
             lastName: String,
             email: String,
             password: String): Auth!
  deleteUser(id: ID!): Boolean!

  addFriend(userId: ID!,
               friendId: ID!): Friend
  removeFriend(userId: ID!,
               friendId: ID!): Friend
  updateFriendship(userId: ID!,
                   friendId: ID!,
                   status: String!): Friend!

  addThought(content: String!,
             thoughtReplyOfId: ID): Thought!
  updateThought(thoughtId: ID!,
                content: String!): Thought!
  removeThought(id: ID!): Boolean!

  addLiked(thoughtId: ID!): Liked!
  removeLiked(thoughtId: ID!,
              likedByUserId: ID!): Liked!
  replayToThought(thoughtId: ID!,
                  userId: ID!,
                  content: String!
                  thoughtReplayOfId: ID!): Thought!
  reThought(reThoughtByUserId: ID!,
            originalThoughtId: ID!,
            additionalThoughtId: ID!): ReThought!
}`;


module.exports  = typeDefs;
 


