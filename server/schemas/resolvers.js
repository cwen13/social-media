const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models/User');
const {Friend } = require('../models/Friend');
const {Thought} = require('../models/Thought');
const {Comment} = require('../models/Comment');
const { signToken } = require('../utils/auth');
 
const resolver = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne({id: context.user.id});
    },
    users: async (parent, args, context) => {
      return User.findAll({});
    },
    user: async (parent, {email}, context) => {
      return User.findOne({where: {email}});
    },
    userThoughts: async (parent, {userId}, context) => {
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
      return Thought.create( {userId, content});  
    },
    
    updateThought: async (parent, {id, content}, context) => {
      return await Thought.update({content}, {where: {id}});
    },

    addComment: async (parent, {userId, thoughtId, comment}, context) => {
      return await Comment.create({userId, thoughtId, comment});
    },

    updateComment: async (parent, {id, comment}, context) => {
      return await Comment.update({ comment}, {where: {id}});
    },

    addFriend: async (parent, {userId, friendId, sent}, context) => {
      return await Friend.create({userId, friendId, sent});
    },

    removeFriend: async (parent, {id}, context) => {
      return await Friend.destroy({id});
    },
  }
};
