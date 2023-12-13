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
  profilePicture: String
  friends: [User]
  friendOfFriend: [User]
}

type Friend {
  id: ID!
  userId: ID!
  friendId: ID!
}

type Block {
  id: ID!
  userId: ID!
  blockId: ID!
}

type Pending {
  id: ID!
  userId: ID!
  pendingId: ID!
}

type Thought {
  id: ID!
  userId: ID!
  content: String!
  user: User
}

type Liked {
  id: ID!
  thoughtId: ID!
  likedByUserId: ID!
}

type Reply {
  id: ID!
  replyOfId: ID!
  replyThoughtId: ID!
}

type ReThought {
  id: ID!
  reThoughtOfId: ID!
  reThoughtThoughtId: ID!
}

type Auth {
  token: ID!
  user: User!
}

type Query {
  getMe: User!
  getAllUsers: [User!]!
  getUser(userId: ID): User
  getMyFriends: [User]
  getUserFriends(userId: ID!): [User]

  getMyThoughts: [Thought]
  getAllThoughts: [Thought!]!
  getThought(thoughtId: ID!): Thought
  getUserThoughts(userId: ID!): [Thought]!

  getAllLiked: [Thought]
  getAllMyLiked: [Thought]
  getUserLikedIds(userId: ID!): [Liked]
  getThoughtLikes(thoughtId: ID!): [User]
  getUserLiked(userId: ID!): [Thought]

  getThoughtReplys(thoughtId: ID!): [Thought]
  getThoughtReThoughts(thoughtId: ID!): [Thought]
  getMyReThoughts: [Thought]
  getUserReThoughts(userId: ID!): [Thought]
  getAllReThoughtIds: [ReThought]
  getThoughtReThought(thoughtId: ID!): Thought
  getAllReplyIds: [Reply]
  getUserReplys(userId: ID!): [Thought]
}

type Mutation {
  login(email: String!,
        password: String!): Auth!
  addUser(userName: String!,
          handle: String!,
          firstName: String!,
          lastName: String!,
          email: String!,
          password: String!
          profilePicture: String): Auth!
  updateUser(userId: ID!,
             userName: String,
             handle: String,
             firstName: String,
             lastName: String,
             email: String,
             password: String
             profilePicture: String): Auth!
  deleteUser(userId: ID!): Boolean!

  addFriend(friendId: ID!): Boolean!
  removeFriend(friendId: ID!): Boolean!
  updateFriend(userId: ID!,
               friendId: ID!): Boolean!
  addPending(friendID: ID!): Boolean!
  addBlocked(blockedId: ID!): Boolean!

  addThought(content: String!): Thought!
  updateThought(thoughtId: ID!,
                content: String!): Thought!
  removeThought(thoughtId: ID!): Boolean!

  addLiked(thoughtId: ID!): Boolean!
  removeLiked(thoughtId: ID!): Boolean!

  replyToThought(content: String!
                 thoughtId: ID!): Reply!
  addReThought(originalThoughtId: ID!,
               additionalThought: String,): ReThought
}`;


module.exports = typeDefs;
 


