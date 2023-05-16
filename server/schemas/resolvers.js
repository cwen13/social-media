const { AuthenticationError } = require('apollo-server-express');
const { User, Friend, Thought, Comment, Auth } = require('../models');
const { signToken } = require('../utils/auth');
 
const resolver = {
  Query: {
    me: async (parent, args, context) => {
      if (context.ser) {
	retun User.findOne({id: context.user.id});
      }
      throw mew AuthenticationError("Not logged in!");
    },
    users: async (parent, args, context) => {
      return User.fiondAll({});
    },
    user: async(parent, {email}, context) => {
      if (context.user) {
	User.findOne({where: {email}});
      }
      throw mew AuthenticationError("Not logged in!");
    },
    userThoughts(parent, {userId}, context) => {
      if (context.user) {
	Thought.findAll({where: {userId}});
      }
      throw mew AuthenticationError("Not logged in!");
    }

  },
  Mutation: {
    addUser: async (parent, {id, userName, firstName, lastName, email, password}, context) => {
      if (context.user) {
	const [rowsAffected, userUpdate] = await User.create(
	  {
	    username,
	    firstName,
	    lastName,
	    email,
	    password
	  },
	  {
	    returning: true,
	    where: {id}
	  });
      }
      throw new AuthenticationError('Not logged in');
      return rowsAffected;;
    },
    
    updateUser: async (parent, {id, userName, firstName, lastName, email, password}, context) => {
      const user = await User.update({
	username,
	firstName,
	lastName,
	email,
	password
      });
      const token = signToken(user);
      return {token, user}
    },

    deleteUser: async (parent, {id}, context) => {
    },

    login: async (parent, {email, password}, context) => {
    },

    addThought: async (parent, {userId, content}, context) => {
    },

    updateThought: async (parent, {userId, content}, context) => {
    },

    addComment: async (parent, {userId, thoughtId comment}, context) => {
    },

    updateComment: async (parent, {id, comment}, context) => {
    },

    addFriend: async (parent, {userSentId, userReceivedId, sent}, context) => {
    },

    removeFriend: async (parent, {id}, context) => {
    },

  }
};
