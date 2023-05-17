const { AuthenticationError } = require('apollo-server-express');
const { User, Friend, Thought, Comment, Auth } = require('../models');
const { signToken } = require('../utils/auth');
 
const resolver = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne({id: context.user.id});
    },
    users: async (parent, args, context) => {
      return User.fiondAll({});
    },
    user: async(parent, {email}, context) => {
      return User.findOne({where: {email}});
    },
    userThoughts(parent, {userId}, context) => {
      return Thought.findAll({where: {userId}});
    }

  },
  Mutation: {
    addUser: async (parent, {id, userName, firstName, lastName, email, password}, context) => {
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
      
      return rowsAffected;;
    },
    
    updateUser: async (parent, {id, userName, firstName, lastName, email, password}, context) => {
      return await User.update({
	username,
	firstName,
	lastName,
	email,
	password
      });
    },
  
    deleteUser: async (parent, {id}, context) => {
      return await User.destroy({where: {id}});
    },

    login: async (parent, {email, password}, context) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new AuthenticationError("There is no user of that email");
      }
      const correctPw = await user.checkPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Password is incorecct");
      }
      const token = signToken(user);
      return { token, user };
    },
    
    addThought: async (parent, {userId, content}, context) => {
      return Thought.create( {userId, content}
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
