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
<<<<<<< HEAD
=======

  status: String!

>>>>>>> be32e9509fe9177e93f13546dc548243ed183876
}

type Thought {
  id: ID!
  userId: ID!
  content: String!
  thoughtReplyOfId: ID!
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
<<<<<<< HEAD
=======
  user: User!
  thought: Thought!

>>>>>>> be32e9509fe9177e93f13546dc548243ed183876
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
             firstName: String,
             lastName: String,
             email: String,
             password: String): Auth!
  deleteUser(id: ID!): Boolean!

  addFriend(userId: ID!,
               friendId: ID!,
               status: String!): Friend
  removeFriend(userId: ID!,
               friendId: ID!): Friend
  updateFriendship(userId: ID!,
                   friendId: ID!,
                   status: String!): Friend!

  addThought(userId: ID!,
                content: String!,
                thoughtReplayOfId: ID,
                reThought: Boolean!): Thought!
  updateThought(id: ID!,
                content: String!): Thought!
  removeThought(id: ID!): Thought!

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
 


