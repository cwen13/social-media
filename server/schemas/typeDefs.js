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

type Following {
  id: ID!
  userId: ID!
  followingId: ID!
}

type Blocked {
  id: ID!
  userId: ID!
  blockedId: ID!
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
  thought: Thought
}

type Reply {
  id: ID!
  replyOfId: ID!
  replyThoughtId: ID!
  thought: Thought
}

type ReThought {
  id: ID!
  reThoughtOfId: ID!
  reThoughtThoughtId: ID!
  thought: Thought
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
  getMyFriendRequests: [Pending]

  getMyFollowing: [User]
  getUserFollowing(userId: ID!): [User]

  getMyThoughts: [Thought]
  getAllThoughts: [Thought!]!
  getThought(thoughtId: ID!): Thought
  getUserThoughts(userId: ID!): [Thought]!

  getAllLiked: [Thought]
  getAllMyLiked: [Liked]
  getUserLikedIds(userId: ID!): [Liked]
  getThoughtLikes(thoughtId: ID!): [User]
  getUserLiked(userId: ID!): [Thought]
  getUserBlocked(userId: ID!): [User]
  getMyBlockedUsers: [User]

  getThoughtReplys(thoughtId: ID!): [Thought]
  getThoughtReThoughts(thoughtId: ID!): [Thought]
  getMyReThoughts: [Thought]
  getUserReThoughts(userId: ID!): [Thought]
  getAllReThoughtIds: [ReThought]
  getAllReplyIds: [Reply]
  getUserReplys(userId: ID!): [Thought]
  getReThoughtIdPairs(originalId: ID!): ReThought
  getReplyIdPairs(originalId: ID!): Reply
  getReThoughtOriginalThought(reThoughtId: ID!): Thought
  getReplyOriginalThought(replyId: ID!): Thought

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

  addBlocked(blockedId: ID!): Boolean!
  removeBlocked(blockedId: ID!): Boolean!

  addFollow(followingId: ID!): Boolean!
  removeFollow(followingId: ID!): Boolean!

  addLiked(thoughtId: ID!): Boolean!
  removeLiked(thoughtId: ID!): Boolean!

  sendFriendRequest(pendingId: ID!): Boolean!
  denyFriendRequest(pendingId: ID!): Boolean!
  addFriend(friendId: ID!): Boolean!
  removeFriend(friendId: ID!): Boolean!

  addThought(content: String!): Thought!
  updateThought(thoughtId: ID!,
                content: String!): Thought!
  removeThought(thoughtId: ID!): Boolean!


  replyToThought(content: String!
                 thoughtId: ID!): Reply!
  addReThought(originalThoughtId: ID!,
               additionalThought: String,): ReThought!
}`;


module.exports = typeDefs;
 


