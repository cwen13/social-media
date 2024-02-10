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


type Notification {
  id: ID!
  createdAt: String!
  fromUser: ID!
  toUser: ID
  friendRequest: Boolean
  followed: Boolean
  likedThoughtId: ID
  replyToId: ID
  reThoughtOfId: ID
  acknowledge: Boolean!
}

type NotificationList {
  notifications: [Notification]
  friendRequests: [Pending]
  followers: [Following]
  likes: [Liked]
  replys: [Reply]
  reThoughts: [ReThought]  
}


type Thought {
  id: ID!
  createdAt: String!
  userId: ID!
  content: String!
  thoughtAuthor: User
}

type Reply {
  id: ID!
  createdAt: String!
  replyOfId: ID!
  replyThoughtId: ID!
  replyThought: Thought
  originalReplyThought: Thought
}

type ReThought {
  id: ID!
  createdAt: String!
  reThoughtOfId: ID!
  reThoughtThoughtId: ID!
  reThoughtThought: Thought
  originalReThoughtThought: Thought
}

type Liked {
  id: ID!
  createdAt: String!
  thoughtId: ID!
  likedByUserId: ID!
  thoughtLiker: User
  likedThought: Thought
}

type Following {
  id: ID!
  createdAt: String!
  userId: ID!
  followingId: ID!
  follower: User
}

type Friend {
  id: ID!
  createdAt: String!
  userId: ID!
  friendId: ID!
}

type Pending {
  id: ID!
  createdAt: String!
  userId: ID!
  requestingFriend: User
  pendingId: ID!
}

type Blocked {
  id: ID!
  userId: ID!
  blockedId: ID!
  createdAt: String
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
  getMyPendingRequests: [Pending]

  getMyFollowing: [User]
  getUserFollowing(userId: ID!): [User]

  getMyThoughts: [Thought]
  getAllThoughts: [Thought!]!
  getThought(thoughtId: ID!): Thought
  getUserThoughts(userId: ID!): [Thought]!

  getAllLiked: [Thought]
  getAllMyLiked: [Liked]
  getUserLikedIds( userId: ID! ): [Liked]
  getThoughtLikes( thoughtId: ID! ): [User]
  getUserLiked( userId: ID! ): [Thought]
  getUserBlocked( userId: ID! ): [User]
  getMyBlockedUsers: [User]

  getThoughtReplys( thoughtId: ID! ): [Thought]
  getThoughtReThoughts( thoughtId: ID! ): [Thought]
  getMyReThoughts: [Thought]
  getUserReThoughts( userId: ID! ): [Thought]
  getAllReThoughtIds: [ReThought]
  getAllReplyIds: [Reply]
  getUserReplys( userId: ID! ): [Thought]
  getReThoughtIdPairs( originalId: ID! ): ReThought
  getReplyIdPairs( originalId: ID! ): Reply
  getReThoughtOriginalThought( reThoughtId: ID! ): Thought
  getReplyOriginalThought( replyId: ID! ): Thought

  getMyNotifications: NotificationList
  getMyNotificationIds: [Notification]

  getLikedNotification( likedId: ID!, fromUser: ID! ): Notification
  getNotificaitonId( fromUser: ID,
                     toUser: ID,
                     friendRequest: Boolean,
                     followed: Boolean,
                     likedThoughtId: ID,
                     replyToId: ID,
                     reThoughtOfId: ID
                     ): ID
}

type Mutation {
  login( email: String!,
        password: String!): Auth!
  addUser( userName: String!,
          handle: String!,
          firstName: String!,
          lastName: String!,
          email: String!,
          password: String!
          profilePicture: String
         ): Auth!
  updateUser( userId: ID!,
             profilePicture: String
             userName: String,
             handle: String,
             firstName: String,
             lastName: String,
             email: String,
             password: String): Boolean!
  deleteUser( userId: ID! ): Boolean!

  addBlocked( blockedId: ID! ): Boolean!
  removeBlocked( blockedId: ID! ): Boolean!

  addFollow( followingId: ID! ): Boolean!
  removeFollow( followingId: ID! ): Boolean!

  addLiked( thoughtId: ID!,
            thoughtUserId: ID!
          ): Boolean!
  removeLiked( thoughtId: ID! ): Boolean!

  sendFriendRequest( pendingId: ID! ): Boolean!
  denyFriendRequest( pendingId: ID! ): Boolean!
  approveFriendRequest( friendId: ID! ): Boolean!
  removeFriend( friendId: ID! ): Boolean!

  addThought( content: String! ): Thought!
  updateThought( thoughtId: ID!,
                 content: String!
               ): Thought!
  removeThought( thoughtId: ID! ): Boolean!


  replyToThought( content: String!
                  thoughtId: ID!
                  thoughtUserId: ID!
                ): Reply!
  addReThought( originalThoughtId: ID!,
                additionalThought: String,
                originalThoughtUserId: ID!
              ): ReThought!
  acknowledgeNotification( notificationId: ID! ): Boolean!
}`;


module.exports = typeDefs;
 


